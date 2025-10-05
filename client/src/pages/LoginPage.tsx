import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import marsVideo from "@assets/Mars2_1759674528718.mp4";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "user" && password === "1234") {
      onLogin();
    } else {
      alert("Invalid credentials! Use username: user, password: 1234");
    }
  };

  return (
    <div className="login-container">
      <video autoPlay loop muted className="login-bg-video">
        <source src={marsVideo} type="video/mp4" />
      </video>

      <div className="login-card">
        <h2 className="login-title">NASA Image Explorer</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
            data-testid="input-username"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
            data-testid="input-password"
          />
          <Button type="submit" className="login-button" data-testid="button-login">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
