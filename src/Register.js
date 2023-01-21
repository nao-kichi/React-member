// Register.js 新規登録機能画面
// メールアドレスとパスワードを登録して、ログインをする。
// 入力条件は??
// もう少し情報を加えることはできない??→参考になるものを見つけてきて

// useState import = 更新する関数である第2引数を呼び出し、第1引数の値にプラスします。
// onAuthStateChanged = Firebaseが用意してくれている関数
// Navigate,Linkをimport
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./FirebaseConfig.js";
import { Navigate, Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const Register = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    // 関数handleSubmitを定義
    const handleSubmit = async (e) => {
        // これがないと関数handleSubmitが実行されたときにブラウザがリロードされてしまう。
        e.preventDefault();

        // createUserWithEmailAndPasswordはFirebaseで用意された関数
        // authはFirebaseConfig.jsで定義
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
    // state変数userを定義
    const [user, setUser] = useState("");

    // ログインしているかどうかを判定する
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