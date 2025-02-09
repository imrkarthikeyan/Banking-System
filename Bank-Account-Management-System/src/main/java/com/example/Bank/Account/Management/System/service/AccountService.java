package com.example.Bank.Account.Management.System.service;

import com.example.Bank.Account.Management.System.model.Account;
import com.example.Bank.Account.Management.System.repository.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    private AccountRepo accountRepo;

    public Account CreateAccount(String accountnumber, String accountholder, double pin, double currentbalance){
        Account account = new Account(accountnumber, accountholder, pin, currentbalance);
        if (accountRepo.existsById(accountnumber)) {
            throw new RuntimeException("Account with this number already exists");
        }
        if (accountnumber == null) {
            throw new IllegalArgumentException("ID must not be null");
        }
        return accountRepo.save(account);
    }

    public Account deposit(String accountnumber, double amount){
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        Account account = accountRepo.findById(accountnumber).orElseThrow(()-> new RuntimeException("Account not fount"));
        account.deposit(amount);
        return accountRepo.save(account);
    }

    public boolean withdraw(String accountnumber, double amount, double givenpin){
        Account account = accountRepo.findById(accountnumber).orElseThrow(()-> new RuntimeException("Account not fount"));
        if(account.withdraw(amount, givenpin)){
            accountRepo.save(account);
            return true;
        }
        return false;
    }

    public boolean transfer(String senderaccountnumber, String receiveraccountnumber, double amount, double pin){
        Account sender = accountRepo.findById(senderaccountnumber).orElseThrow(()-> new RuntimeException("Sender account not found"));
        Account receiver = accountRepo.findById(receiveraccountnumber).orElseThrow(()-> new RuntimeException("Receiver account not found"));
        if(sender.transfer(amount, pin, receiver)){
            accountRepo.save(receiver);
            accountRepo.save(sender);
            return true;
        }
        return false;
    }

    public double checkbalance(String amountnumber, double pin){
        Account account = accountRepo.findById(amountnumber).orElseThrow(()-> new RuntimeException("Account not found"));
        if(account.getPin()==pin){
            return account.getCurrentbalance();
        }
        else{
            throw new RuntimeException("Invalid pin");
        }
    }

    public boolean deleteAccount(String accountnumber, double Pin){
        Account account =accountRepo.findById(accountnumber).orElseThrow(()-> new RuntimeException("Account not found"));
        if(account.getPin()==Pin){
            accountRepo.delete(account);
            return true;
        }
        else{
            throw new RuntimeException("Invalid pin. check your pin");
        }
    }
}