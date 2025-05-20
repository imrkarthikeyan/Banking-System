package com.example.Bank.Account.Management.System.repository;

import com.example.Bank.Account.Management.System.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepo extends JpaRepository<Account,String> {
}