"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Box, Button, Container, Paper, TextField, Typography, Link } from "@mui/material"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    // Lógica de autenticação aqui
    console.log("Login com:", { email, password })
    // Redirecionar após login bem-sucedido
    router.push("/progresso_escolas/progresso")
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        // Fundo super vibrante e animado com formas orgânicas
        background: "linear-gradient(135deg, #DCE775 0%, #8BC34A 50%, #4CAF50 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "60%",
          height: "60%",
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          background: "rgba(255,255,255,0.15)",
          zIndex: 0,
          animation: "blob1 20s infinite ease-in-out alternate",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-15%",
          right: "-15%",
          width: "70%",
          height: "70%",
          borderRadius: "60% 40% 30% 70% / 60% 70% 30% 40%",
          background: "rgba(255,255,255,0.1)",
          zIndex: 0,
          animation: "blob2 25s infinite ease-in-out alternate-reverse",
        },
        "@keyframes blob1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, 50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, -40px) scale(0.9)" },
        },
        "@keyframes blob2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-40px, -30px) scale(0.95)" },
          "66%": { transform: "translate(20px, 60px) scale(1.05)" },
        },
      }}
    >
      <Container maxWidth="sm" sx={{ zIndex: 1 }}>
        <Paper
          elevation={20} // Sombra máxima para um efeito flutuante dramático
          sx={{
            p: { xs: 4, md: 8 }, // Padding generoso
            borderRadius: 12, // Bordas super arredondadas para um visual orgânico
            boxShadow: "0 30px 80px rgba(0,0,0,0.35)", // Sombra profunda e elegante
            border: "3px solid rgba(76, 175, 80, 0.5)", // Borda mais grossa e translúcida
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.99)", // Quase opaco, mas com um toque de leveza
            backdropFilter: "blur(12px)", // Efeito de desfoque intenso para profundidade
            position: "relative",
            overflow: "hidden",
            transform: "scale(0.9)", // Animação de entrada mais pronunciada
            opacity: 0,
            animation: "fadeInScaleUp 0.8s ease-out forwards 0.2s", // Atraso para o fundo aparecer primeiro
            "@keyframes fadeInScaleUp": {
              "0%": { opacity: 0, transform: "scale(0.9)" },
              "100%": { opacity: 1, transform: "scale(1)" },
            },
            "&::before": {
              // Detalhe de canto superior esquerdo
              content: '""',
              position: "absolute",
              top: -20,
              left: -20,
              width: 150,
              height: 150,
              background: "radial-gradient(circle, #A5D6A7 0%, transparent 70%)",
              opacity: 0.3,
              borderRadius: "50%",
              animation: "pulseGlow 3s infinite alternate",
            },
            "&::after": {
              // Detalhe de canto inferior direito
              content: '""',
              position: "absolute",
              bottom: -20,
              right: -20,
              width: 150,
              height: 150,
              background: "radial-gradient(circle, #66BB6A 0%, transparent 70%)",
              opacity: 0.3,
              borderRadius: "50%",
              animation: "pulseGlow 3s infinite alternate-reverse",
            },
            "@keyframes pulseGlow": {
              "0%, 100%": { transform: "scale(1)", opacity: 0.3 },
              "50%": { transform: "scale(1.1)", opacity: 0.5 },
            },
          }}
        >
          <Box sx={{ mb: 6 }}>
            <Image
              src="/escolas_logo.jpeg" // Caminho da imagem corrigido para .jpeg
              alt="Eco Escolas Logo"
              width={180} // Logo ainda maior para destaque máximo
              height={135}
              style={{
                objectFit: "contain",
                margin: "0 auto",
                marginBottom: "25px",
                filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.2))", // Sombra no logo
                animation: "logoBounce 1.5s ease-out", // Animação de entrada para o logo
              }}
            />
            <Typography
              variant="h1" // Título principal em destaque
              sx={{
                mt: 2,
                fontWeight: 900, // Ultra negrito
                color: "#1B5E20", // Verde escuro forte
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.05em", // Mais apertado para impacto
                lineHeight: 1,
                textShadow: "3px 3px 6px rgba(0,0,0,0.15)", // Sombra de texto mais pronunciada
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" }, // Responsivo
              }}
            >
              Bem-vindo(a) de Volta!
            </Typography>
            <Typography variant="h5" sx={{ color: "#4CAF50", mt: 2.5, fontWeight: 700, lineHeight: 1.4 }}>
              Acesse sua conta e continue a jornada.
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4, // Bordas mais arredondadas
                  backgroundColor: "rgba(255,255,255,0.8)", // Fundo levemente transparente
                  "& fieldset": {
                    borderColor: "#4CAF50",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  },
                  "&:hover fieldset": {
                    borderColor: "#2E7D32",
                    boxShadow: "0 0 10px rgba(76, 175, 80, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1B5E20",
                    borderWidth: "4px", // Borda super grossa e destacada no foco
                    boxShadow: "0 0 15px rgba(27, 94, 32, 0.5)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#4CAF50",
                  fontWeight: 700, // Mais negrito
                  "&.Mui-focused": {
                    color: "#1B5E20",
                  },
                },
              }}
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: "rgba(255,255,255,0.8)",
                  "& fieldset": {
                    borderColor: "#4CAF50",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  },
                  "&:hover fieldset": {
                    borderColor: "#2E7D32",
                    boxShadow: "0 0 10px rgba(76, 175, 80, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1B5E20",
                    borderWidth: "4px",
                    boxShadow: "0 0 15px rgba(27, 94, 32, 0.5)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#4CAF50",
                  fontWeight: 700,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1B5E20",
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #4CAF50 30%, #2E7D32 90%)", // Gradiente vibrante
                color: "white",
                py: 2.2, // Padding ainda maior
                fontSize: "1.4rem", // Fonte grande
                fontWeight: 900, // Ultra negrito
                borderRadius: 5, // Super arredondado
                boxShadow: "0 15px 45px rgba(76, 175, 80, 0.6)", // Sombra muito forte
                textTransform: "uppercase",
                letterSpacing: "2px", // Mais espaçamento para impacto
                transition: "all 0.4s cubic-bezier(.25,.8,.25,1)", // Curva de transição mais suave e dinâmica
                "&:hover": {
                  background: "linear-gradient(45deg, #2E7D32 30%, #1B5E20 90%)", // Gradiente no hover
                  boxShadow: "0 20px 60px rgba(76, 175, 80, 0.8)",
                  transform: "translateY(-7px) scale(1.03)", // Efeito de "levantar" e expandir mais dramático
                },
                "&:active": {
                  transform: "translateY(0) scale(0.97)", // Efeito de "pressionar"
                  boxShadow: "0 5px 15px rgba(76, 175, 80, 0.4)",
                },
              }}
            >
              Entrar
            </Button>
          </Box>
          <Box sx={{ mt: 5.5, display: "flex", flexDirection: "column", gap: 2 }}>
            <Link
              href="#" // Link para "Esqueceu sua senha?"
              variant="body1"
              sx={{
                color: "#4CAF50",
                fontWeight: 700,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline", color: "#2E7D32" },
                transition: "color 0.3s ease",
              }}
            >
              Esqueceu sua senha?
            </Link>
            <Typography variant="body1" sx={{ color: "#666", fontSize: "1.15rem" }}>
              Não tem uma conta?{" "}
              <Link
                href="/pages/cadastro/cadastro_page" // Rota correta para a página de cadastro
                variant="body1"
                sx={{
                  color: "#1B5E20", // Cor forte para o link
                  fontWeight: 800, // Mais negrito
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline", color: "#2E7D32" },
                  transition: "color 0.3s ease",
                }}
              >
                Cadastre-se aqui
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
