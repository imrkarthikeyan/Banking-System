package com.example.Bank.Account.Management.System.controller;

import com.example.Bank.Account.Management.System.model.Account;
import com.example.Bank.Account.Management.System.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping("/create")
    public Account createAccount(@RequestBody Account account) {
        return accountService.CreateAccount(account.getAccountnumber(), account.getAccountholder(), account.getPin(), account.getCurrentbalance());
    }

    @PostMapping("/deposit/{accountnumber}")
    public Account deposit(@PathVariable String accountnumber, @RequestParam double amount) {
        return accountService.deposit(accountnumber, amount);
    }

    @PostMapping("/withdraw/{accountnumber}")
    public String withdraw(@PathVariable String accountnumber, @RequestParam double amount, @RequestParam double pin) {
        boolean success = accountService.withdraw(accountnumber, amount, pin);
        return success ? "Withdrawal successful" : "Withdrawal failed. Check PIN or balance.";
    }

    @PostMapping("/transfer")
    public String transfer(@RequestParam String senderAccountnumber, @RequestParam String receiverAccountnumber, @RequestParam double amount, @RequestParam double pin) {
        boolean success = accountService.transfer(senderAccountnumber, receiverAccountnumber, amount, pin);
        return success ? "Transfer successful" : "Transfer failed. Check PIN or balance.";
    }

    @GetMapping("/balance/{accountnumber}")
    public double checkBalance(@PathVariable String accountnumber, @RequestParam double pin) {
        return accountService.checkbalance(accountnumber, pin);
    }

    @DeleteMapping("/delete/{accountnumber}")
    public String deleteAccount(@PathVariable String accountnumber, @RequestParam double pin) {
        accountService.deleteAccount(accountnumber,pin);
        return "Account deleted successfully";
    }
}
