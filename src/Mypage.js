/* Mypage.js（完成版） */

import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./FirebaseConfig.js";
import {
    useNavigate,
    Navigate
} from "react-router-dom";
import { collection, addDoc } from "firebase/firestore"; 

const Mypage = () => {
    const [user, setUser] = useState("");
    const [memo, setMemo] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    /* ↓「navigate」を定義 */
    const navigate = useNavigate();

    /* テキストを入力する処理 */
    const handleChange = (event) => {
        setMemo(event.target.value)
    }

    /* firestoreにメモを登録する処理 */
    const registerMemo = async () => {
        if(user) {
            try {
                await addDoc(collection(db, "memos"), {
                  user_id: user.uid,
                  memo,
                });
                alert("メモの登録に成功しました")
              } catch (e) {
                alert("メモの登録に失敗しました");
              }
        } else {
            alert('ユーザーが登録されていません')
        }
    }

    /* ↓関数「logout」を定義 */
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
                            <textarea onChange={handleChange} value={memo} />
                            <button onClick={registerMemo}>メモ登録</button>
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