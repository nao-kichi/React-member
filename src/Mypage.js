// Mypage.js ログイン中のページ

// useState import = 更新する関数である第2引数を呼び出し、第1引数の値にプラスします。
// onAuthStateChanged,signOut = Firebaseが用意してくれている関数
// Navigate,Linkをimport
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { useNavigate, Navigate } from "react-router-dom";

const Mypage = () => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    // navigateを定義
    const navigate = useNavigate();

    // logoutを定義
    // user?.emailでユーザーのメールアドレスを表示させている。
    const logout = async () => {
        await signOut(auth);
        navigate("/login/");
    }

    return (
        <>
            {!loading && (
                <>
                    {!user ? (
                        <Navigate to={`/login/`} />
                    ) : (
                        <>
                            <h1>マイページ</h1>
                            <p>{user?.email}</p>
                            <button onClick={logout}>ログアウト</button>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Mypage;