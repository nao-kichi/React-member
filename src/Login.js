// Login.js ログイン機能画面

// useState import = 更新する関数である第2引数を呼び出し、第1引数の値にプラスします。
// onAuthStateChanged = Firebaseが用意してくれている関数
// Navigate,Linkをimport
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // 関数handleSubmitを定義
    const handleSubmit = async (e) => {
        // これがないとhundloSubmit実行時にブラウザがリロードされてしまう。
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
        } catch (error) {
            alert("メールアドレスまたはパスワードが間違っています");
        }
    };

    // ログインを判定する設定
    const [user, setUser] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    });

    return (
        <>
            {user ? (
                <Navigate to={`/`} />
            ) : (
                <>
                    <h1>ログインページ</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>メールアドレス</label>
                            <input
                                name="email"
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>パスワード</label>
                            <input
                                name="password"
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <button>ログイン</button>
                        {/* ↓リンクを追加 */}
                        <p>新規登録は<Link to={`/register/`}>こちら</Link></p>
                    </form>
                </>
            )}
        </>
    );
};

export default Login;