/* Register.js（完成版） */

/* 「useEffect」をimport↓ */
import React, { useState, useEffect } from "react";
/* ↓「onAuthStateChanged」をimport */
// onAuthStateChanged」はFirebaseが用意してくれている関数
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { auth, db } from "./FirebaseConfig.js";
/* 「Navigate,Link」をimport↓ */
import { Navigate, Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const Register = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    /* ↓関数「handleSubmit」を定義 */
    const handleSubmit = async (e) => {
        // これがないと関数「handleSubmit」が実行されたときにブラウザがリロードされてしまう。
        e.preventDefault();

        // createUserWithEmailAndPassword」はFirebaseで用意された関数
        // authは「FirebaseConfig.js」で定義
        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            ).then(async (userCredential) => {
                await addDoc(collection(db, "users"), {
                    user_id: userCredential.user.uid,
                    email: registerEmail,
                    password: registerPassword,
                });
            });
        } catch (error) {
            alert("正しく入力してください");
        }
    };

    // 以下の記述でログインしているかどうかを判定
    /* ↓state変数「user」を定義 */
    const [user, setUser] = useState("");

    /* ↓ログインしているかどうかを判定する */
    // onAuthStateChanged」はFirebaseが用意してくれている関数
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    return (
        <>
            {user ? (
                <Navigate to={`/`} />
            ) : (
                <>
                    <h1>新規登録</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>メールアドレス</label>
                            <input
                                name="email"
                                type="email"
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>パスワード</label>
                            <input
                                name="password"
                                type="password"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                        </div>
                        <button>登録する</button>
                        {/* ↓リンクを追加 */}
                        <p>ログインは<Link to={`/login/`}>こちら</Link></p>
                    </form>
                </>
            )}
        </>
    );
};

export default Register;