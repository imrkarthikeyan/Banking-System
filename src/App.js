import { useState } from "react";
import './App.css'

function App() {
    const [accountNumber, setAccountNumber]=useState("");
    const [accountHolder, setAccountHolder]=useState("");
    const [amount, setAmount]=useState("");
    const [pin, setPin]=useState("");
    const [receiverAccount, setReceiverAccount]=useState("");
    const [message, setMessage]=useState("");
    const [operation, setOperation]=useState("create");

    // Create Account
    const createAccount=async()=>{
        try{
            const response=await fetch("http://localhost:8080/Account/create",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    accountnumber:accountNumber,
                    accountholder:accountHolder,
                    pin:pin,
                    currentbalance:amount,
                }),
            });

            const result=await response.json();
            if(response.ok){
                setMessage(`Account created successfully! Account Number: ${result.accountnumber}`);
            }
            else{
                setMessage(`Error: ${result.message}`);
            }
        }
        catch(error){
            setMessage("Failed to create account. Please try again.");
            console.error(error);
        }
    };

    // Deposit
    const deposit=async()=>{
        try{
            const response=await fetch(`http://localhost:8080/Account/deposit/${accountNumber}?amount=${amount}`,{
                method: "POST",
            })

            const result=await response.json();
            if(response.ok){
                setMessage(`Deposit successful! New balance: ${result.currentbalance}`);
            }
            else{
                setMessage("Deposit failed. Please check the amount.");
            }
        }
        catch(error){
            setMessage("Failed to deposit. Please try again.")
            console.error(error)
        }
    };

    // Withdraw
    const withdraw=async()=>{
        try{
            const response=await fetch(`http://localhost:8080/Account/withdraw/${accountNumber}?amount=${amount}&pin=${pin}`,{
                method:"POST",
            });

            const result = await response.json();
            if(response.ok){
                setMessage(`Withdraw successful! New balance: ${result.currentbalance}`);
            }
            else{
                setMessage("Withdraw failed. Please check the amount.");
            }
        }
        catch(error){
            setMessage("Failed to withdraw. Please try again.");
            console.error(error);
        }
    };

    // Transfer
    const transfer=async()=>{
        try{
            const response=await fetch(`http://localhost:8080/Account/transfer?senderAccountnumber=${accountNumber}&receiverAccountnumber=${receiverAccount}&amount=${amount}&pin=${pin}`,{
                method:"POST",
        });

            const result=await response.json();
            setMessage(result);
        }
        catch(error){
            setMessage("Failed to transfer. Please try again.");
            console.error(error);
        }
    };

    // Check Balance
    const checkBalance=async()=>{
        try{
            const response = await fetch(`http://localhost:8080/Account/balance/${accountNumber}?pin=${pin}`,{
                method: "GET",
            });

            const result=await response.json();
            setMessage(`Current Balance: ${result}`);
        }
        catch (error){
            setMessage("Failed to fetch balance. Please try again.");
            console.error(error);
        }
    };

    // Delete Account
    const deleteAccount=async()=>{
        try{
            const response=await fetch(`http://localhost:8080/Account/delete/${accountNumber}?pin=${pin}`,{
                method:"DELETE",
            });

            const result=await response.json();
            setMessage(result);
        }
        catch(error){
            setMessage("Failed to delete account. Please try again.");
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{color:"dodgerblue"}}>Banking System</h1>

            {/* Create Account Section */}
            {operation==="create" && (
                <div className="form-design">
                    <h2>Create Account</h2>
                    <input
                        type="text"
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <input
                        type="text"
                        placeholder="Account Holder Name"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <input
                        type="number"
                        placeholder="Initial Balance"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{display:"block",margin:"10px auto",padding:"8px", width:"100%"}}
                    />
                    <input
                        type="password"
                        placeholder="PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <button
                        onClick={createAccount}
                        style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}
                    >
                        Create Account
                    </button>
                </div>
            )}

            {/* Deposit Section */}
            {operation === "deposit" && (
                <div className="form-design">
                    <h2>Deposit</h2>
                    <input
                        type="text"
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <button
                        onClick={deposit}
                        style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}
                    >
                        Deposit
                    </button>
                </div>
            )}

            {/* Withdraw Section */}
            {operation === "withdraw" && (
                <div className="form-design">
                    <h2>Withdraw</h2>
                    <input
                        type="text"
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <input
                        type="password"
                        placeholder="PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <button
                        onClick={withdraw}
                        style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}
                    >
                        Withdraw
                    </button>
                </div>
            )}

            {/* Transfer Section */}
            {operation === "transfer" && (
                <div className="form-design">
                    <h2>Transfer</h2>
                    <input
                        type="text"
                        placeholder="Sender Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <input
                        type="text"
                        placeholder="Receiver Account Number"
                        value={receiverAccount}
                        onChange={(e) => setReceiverAccount(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <input
                        type="password"
                        placeholder="PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <button
                        onClick={transfer}
                        style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}
                    >
                        Transfer
                    </button>
                </div>
            )}

            {/* Check Balance Section */}
            {operation === "checkbalance" && (
                <div className="form-design">
                    <h2>Check Balance</h2>
                    <input
                        type="text"
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <input
                        type="password"
                        placeholder="PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <button
                        onClick={checkBalance}
                        style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}
                    >
                        Check Balance
                    </button>
                </div>
            )}

            {/* Delete Account Section */}
            {operation === "delete" && (
                <div className="form-design">
                    <h2>Delete Account</h2>
                    <input
                        type="text"
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <input
                        type="password"
                        placeholder="PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
                    />
                    <button
                        onClick={deleteAccount}
                        style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}
                    >
                        Delete Account
                    </button>
                </div>
            )}

            <p style={{ marginTop: "20px", fontWeight: "bold", color: message.startsWith("Error") ? "red" : "green" }}>{message}</p>

            <div className="btns" style={{ marginTop: "20px" }}>
                <button onClick={() => setOperation("create")}>Create Account</button>
                <button onClick={() => setOperation("deposit")}>Deposit</button>
                <button onClick={() => setOperation("withdraw")}>Withdraw</button>
                <button onClick={() => setOperation("transfer")}>Transfer</button>
                <button onClick={() => setOperation("checkbalance")}>Check Balance</button>
                <button onClick={() => setOperation("delete")}>Delete Account</button>
            </div>

            {/* <h3>created by <span style={{color:"dodgerblue"}}>Karthikeyan R</span></h3> */}
        </div>
    );
}

export default App;