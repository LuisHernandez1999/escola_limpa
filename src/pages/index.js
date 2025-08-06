"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  Divider,
  Fab,
  CircularProgress,
  Backdrop,
  useTheme,
  Chip,
} from "@mui/material"
import Image from "next/image"
import Recycling from "@mui/icons-material/Recycling"
import School from "@mui/icons-material/School"
import TrendingUp from "@mui/icons-material/TrendingUp"
import Groups from "@mui/icons-material/Groups"
import MenuBook from "@mui/icons-material/MenuBook"
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"
import LocalDrink from "@mui/icons-material/LocalDrink"
import Battery20 from "@mui/icons-material/Battery20"
import Inventory from "@mui/icons-material/Inventory"
import WorkspacePremium from "@mui/icons-material/WorkspacePremium"
import AutoAwesome from "@mui/icons-material/AutoAwesome"
import CleaningServices from "@mui/icons-material/CleaningServices"
import Transform from "@mui/icons-material/Transform"

// Componente de Loading
const LoadingScreen = ({ open }) => (
  <Backdrop
    sx={{
      color: "#fff",
      zIndex: 9999,
      background:
        "linear-gradient(135deg, rgba(27, 94, 32, 0.95) 0%, rgba(46, 125, 50, 0.95) 50%, rgba(76, 175, 80, 0.95) 100%)",
      backdropFilter: "blur(10px)",
    }}
    open={open}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 4,
      }}
    >
      <Box
        sx={{
          position: "relative",
          animation: "pulse 2s ease-in-out infinite",
          "@keyframes pulse": {
            "0%": {
              transform: "scale(1)",
              opacity: 1,
            },
            "50%": {
              transform: "scale(1.05)",
              opacity: 0.8,
            },
            "100%": {
              transform: "scale(1)",
              opacity: 1,
            },
          },
        }}
      >
        <Image
          src="/escolas_logo.jpeg"
          alt="Eco Escolas Logo"
          width={120}
          height={90}
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: "#A5D6A7",
            animation: "spin 1.5s linear infinite",
            "@keyframes spin": {
              "0%": {
                transform: "rotate(0deg)",
              },
              "100%": {
                transform: "360deg)",
              },
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Recycling sx={{ fontSize: 24, color: "#E8F5E9" }} />
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: "#E8F5E9",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Carregando Progresso das Escolas
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            maxWidth: "400px",
            lineHeight: 1.6,
          }}
        >
          Preparando os dados mais recentes do projeto Eco Escolas...
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#A5D6A7",
              animation: `bounce 1.4s ease-in-out ${index * 0.16}s infinite both`,
              "@keyframes bounce": {
                "0%, 80%, 100%": {
                  transform: "scale(0)",
                },
                "40%": {
                  transform: "scale(1)",
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  </Backdrop>
)

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const theme = useTheme()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToProgress = () => {
    const element = document.getElementById("progress-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleProgressClick = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    try {
      router.push("/progresso_escolas/progresso")
    } catch (error) {
      console.error("Erro ao navegar:", error)
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e8f5e8 100%)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "&": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      }}
    >
      <LoadingScreen open={isLoading} />

      {/* Floating Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
          zIndex: 0,
        }}
      >
        <Recycling sx={{ fontSize: 40, color: "rgba(76, 175, 80, 0.3)" }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "8%",
          animation: "float 8s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-15px)" },
          },
          zIndex: 0,
        }}
      >
        <School sx={{ fontSize: 35, color: "rgba(139, 195, 74, 0.4)" }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "30%",
          left: "10%",
          animation: "float 7s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-25px)" },
          },
          zIndex: 0,
        }}
      >
        <Recycling sx={{ fontSize: 45, color: "rgba(46, 125, 50, 0.25)" }} />
      </Box>

      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.05))",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(46, 125, 50, 0.08), rgba(76, 175, 80, 0.03))",
          zIndex: 0,
        }}
      />

      {/* Floating Action Button */}
      <Fab
        onClick={scrollToProgress}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "#4CAF50",
          color: "white",
          zIndex: 1000,
          boxShadow: "0 8px 25px rgba(76, 175, 80, 0.4)",
          "&:hover": {
            backgroundColor: "#2E7D32",
            transform: "scale(1.1)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <KeyboardArrowDown />
      </Fab>

      {/* Enhanced Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 20%, #4CAF50 60%, #66BB6A 85%, #81C784 100%)",
          color: "white",
          zIndex: 10,
          boxShadow: "0 12px 40px rgba(46, 125, 50, 0.5)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            animation: "pulse 4s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { transform: "scale(1)", opacity: 0.8 },
              "50%": { transform: "scale(1.1)", opacity: 0.4 },
            },
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            right: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            animation: "pulse 6s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { transform: "scale(1)", opacity: 0.6 },
              "50%": { transform: "scale(1.2)", opacity: 0.2 },
            },
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "20%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            animation: "float 8s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-20px)" },
            },
            zIndex: 0,
          }}
        />

        <Toolbar sx={{ py: 6, justifyContent: "center", position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", maxWidth: "1200px" }}>
            {/* Animated Title */}
            <Box
              sx={{
                mb: 3,
                animation: "slideInFromTop 1.2s ease-out",
                "@keyframes slideInFromTop": {
                  "0%": { transform: "translateY(-50px)", opacity: 0 },
                  "100%": { transform: "translateY(0)", opacity: 1 },
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "3px",
                  fontSize: { xs: "2.2rem", md: "3.5rem", lg: "4.2rem" },
                  textTransform: "uppercase",
                  textShadow: "0 6px 12px rgba(0,0,0,0.4)",
                  mb: 2,
                  background: "linear-gradient(45deg, #ffffff, #e8f5e9, #ffffff)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    height: 4,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                    borderRadius: 2,
                  },
                }}
              >
                Projeto Eco Escolas
              </Typography>
            </Box>

            {/* Animated Badge */}
            <Box
              sx={{
                animation: "slideInFromBottom 1.5s ease-out 0.3s both",
                "@keyframes slideInFromBottom": {
                  "0%": { transform: "translateY(30px)", opacity: 0 },
                  "100%": { transform: "translateY(0)", opacity: 1 },
                },
                mb: 4,
              }}
            >
              <Box
                sx={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(20px)",
                  color: "white",
                  px: 8,
                  py: 3,
                  borderRadius: 50,
                  border: "3px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.2)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    animation: "shimmer 3s infinite",
                    "@keyframes shimmer": {
                      "0%": { left: "-100%" },
                      "100%": { left: "100%" },
                    },
                  },
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, fontSize: "1.4rem", position: "relative", zIndex: 1 }}>
                  1ª EDIÇÃO • 2025 
                </Typography>
              </Box>
            </Box>

            {/* Animated Description */}
            <Box
              sx={{
                animation: "fadeInUp 1.8s ease-out 0.6s both",
                "@keyframes fadeInUp": {
                  "0%": { transform: "translateY(20px)", opacity: 0 },
                  "100%": { transform: "translateY(0)", opacity: 1 },
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  opacity: 0.98,
                  maxWidth: "900px",
                  mx: "auto",
                  lineHeight: 1.8,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  textShadow: "0 3px 6px rgba(0,0,0,0.3)",
                  position: "relative",
                }}
              >
                 Começa o projeto Eco Escolas - Reciclando Ideias! Escolas municipais de Goiânia participam desta
                iniciativa revolucionária que promove a coleta consciente de resíduos e a educação ambiental. 
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          pt: 6,
          overflow: "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 8, md: 12 },
            transform: isVisible ? "translateY(0)" : "translateY(50px)",
            opacity: isVisible ? 1 : 0,
            transition: "all 0.8s ease-out",
          }}
        >

          {/* Animated Logo */}
          <Box
            sx={{
              mb: 6,
              animation: "logoFloat 4s ease-in-out infinite",
              "@keyframes logoFloat": {
                "0%, 100%": {
                  transform: "translateY(0px) scale(1)",
                  filter: "drop-shadow(0 10px 20px rgba(76, 175, 80, 0.3))",
                },
                "50%": {
                  transform: "translateY(-15px) scale(1.05)",
                  filter: "drop-shadow(0 20px 40px rgba(76, 175, 80, 0.4))",
                },
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -20,
                  left: -20,
                  right: -20,
                  bottom: -20,
                  background: "linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1))",
                  borderRadius: "50%",
                  animation: "pulse 3s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { transform: "scale(1)", opacity: 0.7 },
                    "50%": { transform: "scale(1.1)", opacity: 0.3 },
                  },
                },
              }}
            >
              <Image
                src="/escolas_logo.jpeg"
                alt="Eco Escolas Logo"
                width={400}
                height={300}
                style={{
                  objectFit: "contain",
                  borderRadius: "12px",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Seção Explicando um pouco mais - ENHANCED */}
        <Paper
          sx={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 255, 248, 0.95) 100%)",
            borderRadius: 6,
            p: { xs: 4, md: 8 },
            my: { xs: 6, md: 10 },
            boxShadow: "0 20px 60px rgba(76, 175, 80, 0.15)",
            border: "2px solid rgba(76, 175, 80, 0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Enhanced Decorative Elements */}
          <Box
            sx={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(76, 175, 80, 0.08), rgba(139, 195, 74, 0.05))",
              animation: "rotate 20s linear infinite",
              "@keyframes rotate": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(46, 125, 50, 0.06), rgba(76, 175, 80, 0.03))",
              animation: "float 8s ease-in-out infinite",
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-20px)" },
              },
              zIndex: 0,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            {/* Enhanced Header */}
            <Box sx={{ textAlign: "center", mb: 10 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 4,
                  background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                  borderRadius: 50,
                  px: 5,
                  py: 2.5,
                  color: "white",
                  boxShadow: "0 10px 30px rgba(76, 175, 80, 0.4)",
                  animation: "glow 2s ease-in-out infinite alternate",
                  "@keyframes glow": {
                    "0%": { boxShadow: "0 10px 30px rgba(76, 175, 80, 0.4)" },
                    "100%": { boxShadow: "0 15px 40px rgba(76, 175, 80, 0.6)" },
                  },
                }}
              >
                <AutoAwesome sx={{ fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.3rem" }}>
                  DESCOBRINDO O PROJETO
                </Typography>
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.2rem", md: "3.2rem" },
                  fontWeight: 800,
                  mb: 6,
                  color: "#1B5E20",
                  fontFamily: "Inter, sans-serif",
                  background: "linear-gradient(135deg, #1B5E20, #4CAF50, #66BB6A)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "40%",
                    height: 3,
                    background: "linear-gradient(90deg, transparent, #4CAF50, transparent)",
                    borderRadius: 2,
                  },
                }}
              >
                Explicando um pouco mais...
              </Typography>
            </Box>

            <Grid container spacing={8} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    textAlign: "center",
                    animation: "slideInLeft 1s ease-out",
                    "@keyframes slideInLeft": {
                      "0%": { transform: "translateX(-50px)", opacity: 0 },
                      "100%": { transform: "translateX(0)", opacity: 1 },
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: -15,
                        left: -15,
                        right: -15,
                        bottom: -15,
                        background: "linear-gradient(45deg, rgba(76, 175, 80, 0.2), rgba(139, 195, 74, 0.1))",
                        borderRadius: "20px",
                        animation: "pulse 4s ease-in-out infinite",
                        "@keyframes pulse": {
                          "0%, 100%": { transform: "scale(1)", opacity: 0.6 },
                          "50%": { transform: "scale(1.05)", opacity: 0.3 },
                        },
                      },
                    }}
                  >
                    <Image
                      src="/kids.jpg"
                      alt="Crianças aprendendo sobre reciclagem"
                      width={500}
                      height={350}
                      style={{
                        objectFit: "cover",
                        borderRadius: "16px",
                        maxWidth: "100%",
                        height: "auto",
                        boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                        position: "relative",
                        zIndex: 1,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    animation: "slideInRight 1s ease-out 0.3s both",
                    "@keyframes slideInRight": {
                      "0%": { transform: "translateX(50px)", opacity: 0 },
                      "100%": { transform: "translateX(0)", opacity: 1 },
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#1B5E20",
                      lineHeight: 1.6,
                      fontSize: { xs: "1.4rem", md: "1.8rem" },
                      fontWeight: 700,
                      mb: 4,
                    }}
                  >
                     Transformando o Futuro
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#424242",
                      lineHeight: 1.7,
                      fontSize: { xs: "1.1rem", md: "1.3rem" },
                      fontWeight: 400,
                      mb: 4,
                    }}
                  >
                    Nossas crianças são o futuro do planeta. O projeto as capacita a serem agentes de
                    mudança, ensinando a importância da reciclagem e do cuidado com o meio ambiente.
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#666",
                      lineHeight: 1.7,
                      fontSize: "1.1rem",
                      mb: 4,
                    }}
                  >
                    Através de atividades lúdicas e educativas, transformamos o aprendizado em uma aventura. As escolas
                    se tornam laboratórios de sustentabilidade, onde cada criança descobre o poder de suas ações.
                  </Typography>
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #E8F5E9, #F1F8E9)",
                      borderRadius: 4,
                      p: 4,
                      border: "2px solid rgba(76, 175, 80, 0.2)",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.1), transparent)",
                        animation: "shimmer 3s infinite",
                        "@keyframes shimmer": {
                          "0%": { left: "-100%" },
                          "100%": { left: "100%" },
                        },
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#2E7D32",
                        fontWeight: 700,
                        lineHeight: 1.6,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                       Juntos, construímos um futuro mais verde para Goiânia. O engajamento das escolas e a
                      participação ativa dos alunos são a chave para o sucesso do Eco Escolas, criando um legado de
                      consciência ambiental.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Beautiful Divider */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 8,
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 2,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.3) 20%, rgba(76, 175, 80, 0.8) 50%, rgba(76, 175, 80, 0.3) 80%, transparent 100%)",
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
              borderRadius: "50%",
              p: 2,
              boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
            }}
          >
            <Recycling sx={{ fontSize: 24, color: "white" }} />
          </Box>
        </Box>

        {/* SEÇÃO MELHORADA: Como Funciona */}
        <Paper
          sx={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 255, 248, 0.95) 100%)",
            borderRadius: 6,
            p: { xs: 4, md: 8 },
            my: { xs: 6, md: 10 },
            boxShadow: "0 20px 60px rgba(76, 175, 80, 0.15)",
            border: "2px solid rgba(76, 175, 80, 0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Elementos decorativos de fundo */}
          <Box
            sx={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(139, 195, 74, 0.03))",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -150,
              left: -150,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(46, 125, 50, 0.04), rgba(76, 175, 80, 0.02))",
              zIndex: 0,
            }}
          />
          <Box sx={{ position: "relative", zIndex: 1 }}>
            {/* Header da Seção */}
            <Box sx={{ textAlign: "center", mb: 10 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 4,
                  background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                  borderRadius: 50,
                  px: 4,
                  py: 2,
                  color: "white",
                  boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
                }}
              >
                <AutoAwesome sx={{ fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
                  SISTEMA GAMIFICADO
                </Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  mb: 4,
                  fontFamily: "Inter, sans-serif",
                  background: "linear-gradient(135deg, #1B5E20, #4CAF50)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                Como Funciona:
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#2E7D32",
                  maxWidth: "900px",
                  mx: "auto",
                  lineHeight: 1.7,
                  fontSize: { xs: "1.2rem", md: "1.4rem" },
                  fontWeight: 500,
                  mb: 6,
                }}
              >
                Cada instituição educacional receberá quatro bags para descarte de materiais recicláveis.
              </Typography>
              {/* Badges informativos */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 8 }}>
                <Chip
                  icon={<School />}
                  label="Cerca de 1 mil alunos"
                  sx={{
                    background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 2,
                    py: 3,
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
                <Chip
                  icon={<Recycling />}
                  label="4 Tipos de Materiais"
                  sx={{
                    background: "linear-gradient(135deg, #FF9800, #F57C00)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 2,
                    py: 3,
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
                <Chip
                  icon={<WorkspacePremium />}
                  label="Sistema de Pontuação"
                  sx={{
                    background: "linear-gradient(135deg, #FFD700, #FFA000)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 2,
                    py: 3,
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
              </Box>
            </Box>

            {/* Seção Principal: Como Funciona */}
            <Box sx={{ mb: 10 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#2E7D32",
                  mb: 6,
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  textAlign: "center",
                }}
              >
                 Sistema Engajante
              </Typography>
              <Grid container spacing={6} sx={{ mb: 8 }}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      background: "white",
                      borderRadius: 4,
                      p: 5,
                      height: "100%",
                      boxShadow: "0 12px 40px rgba(76, 175, 80, 0.1)",
                      border: "2px solid rgba(76, 175, 80, 0.1)",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 20px 60px rgba(76, 175, 80, 0.2)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: -20,
                        right: -20,
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.05))",
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#1B5E20",
                        mb: 3,
                        fontSize: { xs: "1.5rem", md: "1.8rem" },
                        position: "relative",
                      }}
                    >
                       Participação das Escolas
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#555",
                        lineHeight: 1.8,
                        fontSize: "1.1rem",
                        position: "relative",
                      }}
                    >
                      Serão para <strong>Metal, Plástico, Papel/Papelão e Eletrônicos</strong>. Em cada bag que for
                      coletada cheia, a escola receberá um ticket, que valerá 1 ponto para a instituição.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      background: "white",
                      borderRadius: 4,
                      p: 5,
                      height: "100%",
                      boxShadow: "0 12px 40px rgba(255, 152, 0, 0.1)",
                      border: "2px solid rgba(255, 152, 0, 0.1)",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 20px 60px rgba(255, 152, 0, 0.2)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: -20,
                        right: -20,
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(245, 124, 0, 0.05))",
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#E65100",
                        mb: 3,
                        fontSize: { xs: "1.5rem", md: "1.8rem" },
                        position: "relative",
                      }}
                    >
                       Sistema de Pontuação
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#555",
                        lineHeight: 1.8,
                        fontSize: "1.1rem",
                        position: "relative",
                      }}
                    >
                      Quanto mais pontos, mais chances da escola ser premiada com <strong>tablets ou similares</strong>.
                      A escola que conseguir engajar no projeto o maior número de alunos, professores, familiares e
                      comunidade, na coleta de recicláveis, computará mais e mais pontos.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Fórmula Destacada - MELHORADA */}
              <Box
                sx={{
                  background: "linear-gradient(135deg, #E8F5E9, #F1F8E9, #E0F2F1)",
                  borderRadius: 6,
                  p: 6,
                  border: "3px solid rgba(76, 175, 80, 0.3)",
                  mb: 8,
                  maxWidth: "800px",
                  mx: "auto",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 15px 50px rgba(76, 175, 80, 0.2)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: -30,
                    left: -30,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(76, 175, 80, 0.1)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -40,
                    right: -40,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: "rgba(139, 195, 74, 0.08)",
                  }}
                />

                <Box sx={{ textAlign: "center", position: "relative" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      background: "linear-gradient(135deg, #1B5E20, #4CAF50)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: "monospace",
                      fontSize: { xs: "2rem", md: "3rem" },
                      mb: 2,
                      textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    1 BAG = 1 TICKET = 1 PONTO
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#2E7D32",
                      fontWeight: 600,
                      opacity: 0.9,
                      mb: 3,
                    }}
                  >
                    Simplicidade que transforma educação em ação!
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#1B5E20",
                      fontWeight: 700,
                      fontSize: { xs: "1.2rem", md: "1.5rem" },
                    }}
                  >
                    Separação de resíduos = Ação de cidadania
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Cards dos Materiais - NOVA SEÇÃO */}
            <Box sx={{ mb: 10 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#2E7D32",
                  mb: 3,
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  textAlign: "center",
                }}
              >
                 Lembrar: São recicláveis
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#666",
                  mb: 6,
                  textAlign: "center",
                  fontSize: "1.2rem",
                }}
              >
                Plástico, Metal, Eletrônicos, Papel/Papelão
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {[
                  {
                    icon: <LocalDrink sx={{ fontSize: 48 }} />,
                    title: "Plástico",
                    color: "#2196F3",
                    description: "Garrafas plásticas de bebidas, água e refrigerantes",
                    gradient: "linear-gradient(135deg, #2196F3, #1976D2)",
                  },
                  {
                    icon: <Box sx={{ fontSize: 48, fontWeight: 900 }}>Al</Box>,
                    title: "Metal",
                    color: "#9E9E9E",
                    description: "Latas de refrigerante, cerveja e outros produtos",
                    gradient: "linear-gradient(135deg, #9E9E9E, #757575)",
                  },
                  {
                    icon: <Battery20 sx={{ fontSize: 48 }} />,
                    title: "Eletrônicos",
                    color: "#FF5722",
                    description: "Pilhas, baterias e pequenos equipamentos eletrônicos",
                    gradient: "linear-gradient(135deg, #FF5722, #D84315)",
                  },
                  {
                    icon: <Inventory sx={{ fontSize: 48 }} />,
                    title: "Papel/Papelão",
                    color: "#8D6E63",
                    description: "Caixas de papelão, embalagens e materiais similares",
                    gradient: "linear-gradient(135deg, #8D6E63, #6D4C41)",
                  },
                ].map((material, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 4,
                        background: material.gradient,
                        color: "white",
                        boxShadow: `0 8px 25px ${material.color}30`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-10px) scale(1.02)",
                          boxShadow: `0 15px 40px ${material.color}40`,
                        },
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: -20,
                          right: -20,
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.1)",
                        }}
                      />
                      <CardContent
                        sx={{
                          p: 4,
                          textAlign: "center",
                          position: "relative",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Box sx={{ mb: 3, color: "white" }}>{material.icon}</Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              mb: 2,
                              fontSize: "1.3rem",
                            }}
                          >
                            {material.title}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            opacity: 0.9,
                            lineHeight: 1.6,
                            fontSize: "0.95rem",
                          }}
                        >
                          {material.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Seção Transformação, Educação, Limpeza Urbana */}
            <Box sx={{ mb: 10 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#2E7D32",
                  mb: 6,
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  textAlign: "center",
                }}
              >
                Nossos Pilares
              </Typography>
              <Grid container spacing={6} justifyContent="center" alignItems="stretch">
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      textAlign: "center",
                      background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                      borderRadius: 6,
                      p: 6,
                      color: "white",
                      height: "100%",
                      boxShadow: "0 15px 50px rgba(76, 175, 80, 0.3)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 25px 70px rgba(76, 175, 80, 0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Transform sx={{ fontSize: 80, mb: 2, position: "relative" }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, position: "relative" }}>
                      Transformação
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, position: "relative", fontSize: "1.1rem" }}>
                      Mudança comportamental no tratamento do lixo reciclado
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      textAlign: "center",
                      background: "linear-gradient(135deg, #FF9800, #F57C00)",
                      borderRadius: 6,
                      p: 6,
                      color: "white",
                      height: "100%",
                      boxShadow: "0 15px 50px rgba(255, 152, 0, 0.3)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 25px 70px rgba(255, 152, 0, 0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <School sx={{ fontSize: 80, mb: 2, position: "relative" }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, position: "relative" }}>
                      Educação
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, position: "relative", fontSize: "1.1rem" }}>
                      Natureza preservada, futuro mais seguro
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      textAlign: "center",
                      background: "linear-gradient(135deg, #FFD700, #FFA000)",
                      borderRadius: 6,
                      p: 6,
                      color: "white",
                      height: "100%",
                      boxShadow: "0 15px 50px rgba(255, 193, 7, 0.3)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 25px 70px rgba(255, 193, 7, 0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CleaningServices sx={{ fontSize: 80, mb: 2, position: "relative" }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, position: "relative" }}>
                      Limpeza Urbana
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, position: "relative", fontSize: "1.1rem" }}>
                      Goiânia dá um salto na educação ambiental
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Impacto Previsto */}
            <Box
              sx={{
                mt: 8,
                textAlign: "center",
                background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                borderRadius: 4,
                p: 6,
                color: "white",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  left: -20,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -30,
                  right: -30,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, position: "relative" }}>
                Impacto Previsto
              </Typography>
              <Typography variant="h6" sx={{ lineHeight: 1.7, position: "relative", maxWidth: "800px", mx: "auto" }}>
               Promover a educação e a conscientização ambiental em Goiânia, por meio do ensino da coleta seletiva às crianças, incentivando hábitos sustentáveis que elas possam levar para o futuro.
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Beautiful Divider */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 8,
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 2,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.3) 20%, rgba(76, 175, 80, 0.8) 50%, rgba(76, 175, 80, 0.3) 80%, transparent 100%)",
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
              borderRadius: "50%",
              p: 2,
              boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
            }}
          >
            <Recycling sx={{ fontSize: 24, color: "white" }} />
          </Box>
        </Box>

        {/* Experiência Anterior - 2024 */}
        <Paper
          sx={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: 6,
            p: { xs: 4, md: 8 },
            my: { xs: 6, md: 10 },
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            border: "1px solid rgba(76, 175, 80, 0.1)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              color: "#1B5E20",
              mb: 8,
              fontFamily: "Inter, sans-serif",
            }}
          >
             Experiência Anterior
          </Typography>
          <Grid container spacing={8} alignItems="flex-start">
            <Grid item xs={12}>
              <Box
                sx={{
                  background: "linear-gradient(135deg, #E8F5E9, #F1F8E9)",
                  borderRadius: 4,
                  p: 5,
                  border: "2px solid rgba(76, 175, 80, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#2E7D32",
                    fontWeight: 600,
                    mb: 4,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    textAlign: "center",
                  }}
                >
                  Em agosto de 2024 Consórcio Limpa Gyn pratica a educação ambiental em escola municipal da Região
                  Noroeste
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#555",
                    lineHeight: 1.8,
                    fontSize: "1.1rem",
                    mb: 4,
                    textAlign: "center",
                  }}
                >
                  O resultado foi sucesso. Alunos do 4º ao 7º ano conseguiram recolher cerca de{" "}
                  <strong>2 mil unidades de recicláveis</strong>.
                </Typography>
                <Box
                  sx={{
                    background: "white",
                    borderRadius: 3,
                    p: 4,
                    border: "1px solid rgba(76, 175, 80, 0.2)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 600, mb: 2 }}>
                     Engajamento dos Alunos
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.7, mb: 3 }}>
                    Levar materiais recicláveis para a escola (Plástico, Metal, Eletrônicos, Papel/Papelão).
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 600, mb: 2 }}>
                     Primeiro recolhimento de bags
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.7, mb: 3 }}>
                    Com participação de alunos, professores, coordenação e diretoria.
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 600, mb: 2 }}>
                     Nas Cooperativas
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.7 }}>
                    A comercialização de recicláveis pelas cooperativas, dada a elevada qualidade do material recolhido,
                    garante renda e sustento para famílias que dependem da reciclagem. O projeto mostra que é possível
                    unir educação e sustentabilidade e promover a educação ambiental.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Beautiful Divider */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 8,
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 2,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.3) 20%, rgba(76, 175, 80, 0.8) 50%, rgba(76, 175, 80, 0.3) 80%, transparent 100%)",
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
              borderRadius: "50%",
              p: 2,
              boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
            }}
          >
            <Recycling sx={{ fontSize: 24, color: "white" }} />
          </Box>
        </Box>

        {/* Objetivos do Projeto - MELHORADO */}
        <Paper
          sx={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 255, 248, 0.95) 100%)",
            borderRadius: 6,
            p: { xs: 4, md: 8 },
            my: { xs: 6, md: 10 },
            boxShadow: "0 20px 60px rgba(76, 175, 80, 0.15)",
            border: "2px solid rgba(76, 175, 80, 0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Elementos decorativos */}
          <Box
            sx={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(139, 195, 74, 0.03))",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -150,
              left: -150,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(46, 125, 50, 0.04), rgba(76, 175, 80, 0.02))",
              zIndex: 0,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ textAlign: "center", mb: 10 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 4,
                  background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                  borderRadius: 50,
                  px: 4,
                  py: 2,
                  color: "white",
                  boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
                }}
              >
                <AutoAwesome sx={{ fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
                  NOSSOS OBJETIVOS
                </Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  mb: 4,
                  fontFamily: "Inter, sans-serif",
                  background: "linear-gradient(135deg, #1B5E20, #4CAF50)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                Objetivos do Projeto
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#666",
                  maxWidth: "700px",
                  mx: "auto",
                  lineHeight: 1.6,
                  fontSize: "1.2rem",
                }}
              >
                Os pilares que sustentam esta iniciativa de educação ambiental escolar em Goiânia
              </Typography>
            </Box>

            <Grid container spacing={4} justifyContent="center" alignItems="stretch">
              {[
                {
                  icon: <MenuBook sx={{ fontSize: 52, color: "white" }} />,
                  title: "Aprimorar a metodologia",
                  description:
                    "Aprimorar a metodologia de educação ambiental nas escolas, criando experiências práticas e engajantes.",
                  gradient: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                  shadow: "rgba(76, 175, 80, 0.3)",
                },
                {
                  icon: <Groups sx={{ fontSize: 52, color: "white" }} />,
                  title: "Promover o engajamento",
                  description:
                    "Promover o engajamento dos alunos, professores e comunidade escolar nas práticas de sustentabilidade.",
                  gradient: "linear-gradient(135deg, #FF9800, #F57C00)",
                  shadow: "rgba(255, 152, 0, 0.3)",
                },
                {
                  icon: <TrendingUp sx={{ fontSize: 52, color: "white" }} />,
                  title: "Fortalecer parcerias",
                  description:
                    "Fortalecer parcerias com as cooperativas de reciclagem cadastradas, gerando impacto social positivo.",
                  gradient: "linear-gradient(135deg, #9C27B0, #7B1FA2)",
                  shadow: "rgba(156, 39, 176, 0.3)",
                },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 5,
                      background: feature.gradient,
                      color: "white",
                      boxShadow: `0 8px 25px ${feature.shadow}`,
                      transition: "all 0.3s ease",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-10px) scale(1.02)",
                        boxShadow: `0 15px 45px ${feature.shadow}`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: -20,
                        right: -20,
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)",
                      }}
                    />
                    <CardContent
                      sx={{
                        p: 4,
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-between",
                        position: "relative",
                      }}
                    >
                      <Box>
                        <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            mb: 3,
                            fontFamily: "Inter, sans-serif",
                            fontSize: "1.3rem",
                            minHeight: "2.6rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.7,
                          fontSize: "0.95rem",
                          flexGrow: 1,
                          display: "flex",
                          alignItems: "center",
                          opacity: 0.95,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>

        {/* Beautiful Divider */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 8,
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 2,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.3) 20%, rgba(76, 175, 80, 0.8) 50%, rgba(76, 175, 80, 0.3) 80%, transparent 100%)",
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
              borderRadius: "50%",
              p: 2,
              boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
            }}
          >
            <Recycling sx={{ fontSize: 24, color: "white" }} />
          </Box>
        </Box>

        {/* Partnership Section - ENHANCED */}
        <Paper
          sx={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 255, 248, 0.95) 100%)",
            borderRadius: 6,
            p: { xs: 4, md: 8 },
            my: { xs: 6, md: 10 },
            boxShadow: "0 20px 60px rgba(76, 175, 80, 0.15)",
            border: "2px solid rgba(76, 175, 80, 0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Elementos decorativos */}
          <Box
            sx={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(139, 195, 74, 0.03))",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -150,
              left: -150,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(46, 125, 50, 0.04), rgba(76, 175, 80, 0.02))",
              zIndex: 0,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ textAlign: "center", mb: 10 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 4,
                  background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                  borderRadius: 50,
                  px: 4,
                  py: 2,
                  color: "white",
                  boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
                }}
              >
                <Groups sx={{ fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
                  PARCERIA ESTRATÉGICA
                </Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  mb: 4,
                  fontFamily: "Inter, sans-serif",
                  background: "linear-gradient(135deg, #1B5E20, #4CAF50)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                Uma Parceria Transformadora
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#666",
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.7,
                  fontSize: "1.2rem",
                  mb: 8,
                }}
              >
                Unindo forças para criar a primeira iniciativa de educação ambiental escolar de Goiânia
              </Typography>
            </Box>

            <Grid container spacing={8} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={5}>
                <Card
                  sx={{
                    background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                    color: "white",
                    borderRadius: 4,
                    p: 5,
                    boxShadow: "0 15px 50px rgba(76, 175, 80, 0.3)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 25px 70px rgba(76, 175, 80, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.1)",
                    }}
                  />
                  <Box sx={{ textAlign: "center", position: "relative" }}>
                    <Box
                      sx={{
                        background: "rgba(255,255,255,0.2)",
                        borderRadius: 3,
                        p: 2,
                        display: "inline-block",
                        mb: 3,
                      }}
                    >
                      <Image
                        src="/prefeitura.png"
                        alt="Logo Prefeitura de Goiânia"
                        width={120}
                        height={120}
                        style={{ objectFit: "contain" }}
                      />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                      Prefeitura de Goiânia
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                      Secretaria Municipal de Educação
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, opacity: 0.95 }}>
                      Pioneira na criação desta primeira edição do projeto Eco Escolas, coordenando a implementação
                      pedagógica inovadora e o desenvolvimento do currículo de educação sustentável
                    </Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={5}>
                <Card
                  sx={{
                    background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                    color: "white",
                    borderRadius: 4,
                    p: 5,
                    boxShadow: "0 15px 50px rgba(255, 152, 0, 0.3)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 25px 70px rgba(255, 152, 0, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.1)",
                    }}
                  />
                  <Box sx={{ textAlign: "center", position: "relative" }}>
                    <Box
                      sx={{
                        background: "rgba(255,255,255,0.2)",
                        borderRadius: 3,
                        p: 2,
                        display: "inline-block",
                        mb: 3,
                      }}
                    >
                      <Image
                        src="/logolimpa.png"
                        alt="Limpa Gyn"
                        width={120}
                        height={120}
                        style={{ objectFit: "contain" }}
                      />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                      Consórcio Limpa Gyn
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                      Parceira Técnica Especializada
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, opacity: 0.95 }}>
                      Trazendo expertise técnica em gestão de resíduos urbanos, oferecendo conhecimento prático e
                      suporte especializado para esta primeira experiência de educação ambiental
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 8,
                textAlign: "center",
                background: "linear-gradient(135deg, #E8F5E9, #F1F8E9)",
                borderRadius: 4,
                p: 6,
                border: "2px solid rgba(76, 175, 80, 0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  left: -20,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(76, 175, 80, 0.1)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "rgba(139, 195, 74, 0.08)",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#1B5E20",
                  mb: 3,
                  position: "relative",
                }}
              >
                 Juntos por Goiânia
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: "900px",
                  mx: "auto",
                  lineHeight: 1.7,
                  color: "#2E7D32",
                  fontWeight: 500,
                  position: "relative",
                }}
              >
                Esta parceria histórica une conhecimento educacional e expertise técnica para inaugurar uma nova era na
                consciência ecológica da nossa cidade. Juntos, criamos o primeiro projeto de educação ambiental escolar
                de Goiânia, onde o verdadeiro prêmio é a transformação sustentável.
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Beautiful Divider */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 8,
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 2,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.3) 20%, rgba(76, 175, 80, 0.8) 50%, rgba(76, 175, 80, 0.3) 80%, transparent 100%)",
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
              borderRadius: "50%",
              p: 2,
              boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
            }}
          >
            <Recycling sx={{ fontSize: 24, color: "white" }} />
          </Box>
        </Box>

        {/* Launch Event Section - ENHANCED */}
        <Paper
          sx={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 255, 248, 0.95) 100%)",
            borderRadius: 6,
            p: { xs: 4, md: 8 },
            my: { xs: 6, md: 10 },
            boxShadow: "0 20px 60px rgba(76, 175, 80, 0.15)",
            border: "2px solid rgba(76, 175, 80, 0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Elementos decorativos */}
          <Box
            sx={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(139, 195, 74, 0.03))",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -150,
              left: -150,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(46, 125, 50, 0.04), rgba(76, 175, 80, 0.02))",
              zIndex: 0,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 4,
                  background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                  borderRadius: 50,
                  px: 4,
                  py: 2,
                  color: "white",
                  boxShadow: "0 8px 25px rgba(255, 152, 0, 0.3)",
                }}
              >
                <AutoAwesome sx={{ fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
                  LANÇAMENTO OFICIAL
                </Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  mb: 4,
                  fontFamily: "Inter, sans-serif",
                  background: "linear-gradient(135deg, #1B5E20, #4CAF50)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                Evento de Lançamento
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#666",
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.7,
                  fontSize: "1.2rem",
                  mb: 6,
                }}
              >
                O marco histórico que dará início à primeira iniciativa de educação ambiental escolar de Goiânia
              </Typography>
            </Box>

            {/* Centralized Image */}
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
                  },
                  transition: "all 0.3s ease",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -10,
                    left: -10,
                    right: -10,
                    bottom: -10,
                    background: "linear-gradient(45deg, rgba(76, 175, 80, 0.3), rgba(255, 152, 0, 0.3))",
                    borderRadius: "20px",
                    animation: "pulse 4s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { transform: "scale(1)", opacity: 0.7 },
                      "50%": { transform: "scale(1.05)", opacity: 0.3 },
                    },
                    zIndex: -1,
                  },
                }}
              >
                <Image
                  src="/banner.jpeg"
                  alt="Banner do Evento de Lançamento"
                  width={700}
                  height={900}
                  style={{
                    objectFit: "cover",
                    borderRadius: "16px",
                    maxWidth: "100%",
                    height: "auto",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                    color: "white",
                    p: 4,
                    borderRadius: "0 0 16px 16px",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    🎉 Grande Lançamento Histórico
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.95, fontSize: "1.1rem" }}>
                    Participe deste momento único que marcará para sempre a educação ambiental em Goiânia
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Enhanced Description */}
            <Grid container spacing={6} justifyContent="center">
              <Grid item xs={12} md={8}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "#1B5E20",
                      mb: 4,
                      fontSize: { xs: "1.8rem", md: "2.2rem" },
                    }}
                  >
                     
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#555",
                      lineHeight: 1.8,
                      fontSize: "1.2rem",
                      mb: 6,
                    }}
                  >
                    Este evento marca o início de uma nova era na educação ambiental de Goiânia. Será o momento em que
                    oficialmente daremos início ao primeiro projeto de coleta seletiva educativa nas escolas municipais
                    da nossa cidade, criando um legado que transformará gerações.
                  </Typography>

                  <Grid container spacing={4} sx={{ mb: 6 }}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box
                        sx={{
                          background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                          borderRadius: 3,
                          p: 3,
                          color: "white",
                          textAlign: "center",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 10px 30px rgba(76, 175, 80, 0.3)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                           Apresentação
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Oficial do projeto para toda a comunidade
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box
                        sx={{
                          background: "linear-gradient(135deg, #FF9800, #F57C00)",
                          borderRadius: 3,
                          p: 3,
                          color: "white",
                          textAlign: "center",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 10px 30px rgba(255, 152, 0, 0.3)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                           Demonstração
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Prática do sistema de coleta seletiva
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box
                        sx={{
                          background: "linear-gradient(135deg, #2196F3, #1976D2)",
                          borderRadius: 3,
                          p: 3,
                          color: "white",
                          textAlign: "center",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 10px 30px rgba(33, 150, 243, 0.3)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                           Entrega
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          Simbólica das primeiras bags para as escolas 
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #E8F5E9, #F1F8E9)",
                      borderRadius: 4,
                      p: 6,
                      border: "2px solid rgba(76, 175, 80, 0.2)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: -10,
                        left: -10,
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: "rgba(76, 175, 80, 0.1)",
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        color: "#1B5E20",
                        fontWeight: 700,
                        mb: 3,
                        textAlign: "center",
                        position: "relative",
                      }}
                    >
                       Faça Parte da História
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#2E7D32",
                        lineHeight: 1.7,
                        textAlign: "center",
                        fontWeight: 500,
                        position: "relative",
                      }}
                    >
                      Participe do lançamento oficial do Projeto Eco Escolas e seja testemunha do início desta
                      transformação ambiental que marcará para sempre a educação em Goiânia! Juntos, construiremos um
                      futuro mais sustentável para nossas crianças.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Beautiful Divider */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 8,
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 2,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.3) 20%, rgba(76, 175, 80, 0.8) 50%, rgba(76, 175, 80, 0.3) 80%, transparent 100%)",
              borderRadius: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
              borderRadius: "50%",
              p: 2,
              boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
            }}
          >
            <Recycling sx={{ fontSize: 24, color: "white" }} />
          </Box>
        </Box>

        {/* CTA Section */}
        <Box
          id="progress-section"
          sx={{
            textAlign: "center",
            py: { xs: 8, md: 12 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              color: "#1B5E20",
              mb: 4,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Acompanhe Esta Jornada
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#666",
              mb: 8,
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.7,
              fontSize: "1.2rem",
            }}
          >
            Acompanhe o desenvolvimento desta iniciativa e veja como cada escola está fazendo história na educação
            ambiental da nossa cidade.
          </Typography>
          <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleProgressClick}
              disabled={isLoading}
              sx={{
                backgroundColor: "#4CAF50",
                color: "white",
                px: 10,
                py: 4,
                fontSize: "1.3rem",
                fontWeight: 600,
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(76, 175, 80, 0.3)",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#2E7D32",
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 40px rgba(76, 175, 80, 0.4)",
                },
                "&:disabled": {
                  backgroundColor: "#A5D6A7",
                  color: "white",
                },
                transition: "all 0.3s ease",
              }}
            >
              {isLoading ? "Carregando..." : "Acompanhar o Progresso das Escolas"}
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Compact Footer */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
          color: "white",
          py: 6,
          mt: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            zIndex: 0,
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#A5D6A7" }}>
                Projeto Eco Escolas
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6, opacity: 0.9, mb: 2, fontSize: "1rem" }}>
                Primeira edição do projeto de educação ambiental escolar da história de Goiânia - uma iniciativa
                inovadora.
              </Typography>
              <Box
                sx={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.15)",
                  px: 3,
                  py: 1,
                  borderRadius: 3,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  1ª Edição • 2025
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#A5D6A7" }}>
                Realização
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Image
                    src="/prefeitura.png"
                    alt="Prefeitura de Goiânia"
                    width={40}
                    height={40}
                    style={{ objectFit: "contain", marginRight: "12px" }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Prefeitura de Goiânia
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, fontSize: "0.85rem" }}>
                      Secretaria Municipal de Educação
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src="/logolimpa.png"
                    alt="Limpa Gyn"
                    width={40}
                    height={40}
                    style={{ objectFit: "contain", marginRight: "12px" }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Consórcio Limpa Gyn
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, fontSize: "0.85rem" }}>
                      Parceira Técnica Especializada
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#A5D6A7" }}>
                Contato
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                Secretaria Municipal de Educação
                <br />
                Goiânia - GO
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                ecoescolas@goiania.go.gov.br
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                (62) 3524-1000
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.2)" }} />
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              opacity: 0.8,
              fontSize: "0.9rem",
            }}
          >
            &copy; {new Date().getFullYear()} Projeto Eco Escolas Goiânia - Todos os direitos reservados
            <br />A primeira iniciativa de educação ambiental escolar de Goiânia - Uma parceria da Secretaria Municipal
            de Educação com o Consórcio Limpa Gyn
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
