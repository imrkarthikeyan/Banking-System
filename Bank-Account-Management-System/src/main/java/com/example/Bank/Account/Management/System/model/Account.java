package com.example.Bank.Account.Management.System.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Account {
    @Id
    private String Accountnumber;
    private String Accountholder;
    private double Pin;
    private double Currentbalance;


    public Account() {

    }

    public Account(String Accountnumber, String Accountholder, double Pin, double Currentbalance) {
        this.Accountnumber = Accountnumber;
        this.Accountholder = Accountholder;
        this.Pin = Pin;
        this.Currentbalance = Currentbalance;
    }


    public String getAccountnumber() {
        return Accountnumber;
    }

    public void setAccountnumber(String Accountnumber) {
        this.Accountnumber = Accountnumber;
    }

    public String getAccountholder() {
        return Accountholder;
    }

    public void setAccountholder(String Accountholder) {
        this.Accountholder = Accountholder;
    }

    public double getPin() {
        return Pin;
    }

    public void setPin(double Pin) {
        this.Pin = Pin;
    }

    public double getCurrentbalance() {
        return Currentbalance;
    }

    public void setCurrentbalance(double Currentbalance) {
        this.Currentbalance = Currentbalance;
    }

    public void deposit(double amount) {
        this.Currentbalance+= amount;
    }

    public boolean withdraw(double amount, double givenpin) {
        if(givenpin==Pin && Currentbalance>=amount){
            Currentbalance-=amount;
            return true;
        }
        return false;
    }

    public boolean transfer(double amount, double givenpin, Account receiver) {
        if(givenpin==Pin && Currentbalance>=amount){
            Currentbalance-=amount;
            receiver.deposit(amount);
            return true;
        }
        return false;
    }
}