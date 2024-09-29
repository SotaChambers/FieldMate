import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const Login = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(() => {
                setIsAuthenticated(true);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setShowImage(true);

                // 5秒後にログインページへリダイレクト
                setTimeout(() => {
                    navigate("/login"); // ログインページにリダイレクト
                }, 5000);
            });
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>; // ローディング中の表示
    }

    if (showImage) {
        return (
            <div>
                {/* 5秒間表示する画像 */}
                <img src="/path/to/your/image.jpg" alt="Redirecting..." />
            </div>
        );
    }

    if (isAuthenticated) {
        return <>{children}</>; // 認証されている場合は子要素を表示
    }

    return null;
};

export default Login;
