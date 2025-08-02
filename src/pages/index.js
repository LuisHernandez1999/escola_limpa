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
  MobileStepper,
  Fade,
  useTheme,
  Chip,
} from "@mui/material"
import Image from "next/image"
import Recycling from "@mui/icons-material/Recycling"
import School from "@mui/icons-material/School"
import TrendingUp from "@mui/icons-material/TrendingUp"
import Groups from "@mui/icons-material/Groups"
import InsertChart from "@mui/icons-material/InsertChart"
import MenuBook from "@mui/icons-material/MenuBook"
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import Tablet from "@mui/icons-material/Tablet"
import LocalDrink from "@mui/icons-material/LocalDrink"
import Battery20 from "@mui/icons-material/Battery20"
import Inventory from "@mui/icons-material/Inventory"
import WorkspacePremium from "@mui/icons-material/WorkspacePremium"
import AutoAwesome from "@mui/icons-material/AutoAwesome"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"

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
                transform: "360deg",
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
          Preparando os dados mais recentes do projeto EcoEscolas...
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
  const [activeStep, setActiveStep] = useState(0)

  const carouselItems = [
    {
      image: "/kids.jpg",
      alt: "Crianças aprendendo sobre reciclagem",
      text: "Nossas crianças são o futuro do planeta. O projeto Eco Escolas as capacita a serem agentes de mudança, ensinando a importância da reciclagem e do cuidado com o meio ambiente desde cedo.",
    },
    {
      image: "/kids3.jpg",
      alt: "Crianças participando de educação ambiental",
      text: "Através de atividades lúdicas e educativas, transformamos o aprendizado em uma aventura. As escolas se tornam laboratórios de sustentabilidade, onde cada criança descobre o poder de suas ações.",
    },
    {
      image: "/kids4.jpeg",
      alt: "Crianças plantando árvores",
      text: "Juntos, construímos um futuro mais verde para Goiânia. O engajamento das escolas e a participação ativa dos alunos são a chave para o sucesso do Eco Escolas, criando um legado de consciência ambiental.",
    },
  ]

  const maxSteps = carouselItems.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps)
  }

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

  const handleRegisterClick = () => {
    router.push("/cadastro/cadastro_page")
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

      {/* Enhanced Elegant Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 30%, #4CAF50 70%, #66BB6A 100%)",
          color: "white",
          zIndex: 10,
          boxShadow: "0 8px 32px rgba(46, 125, 50, 0.4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
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
            background: "rgba(255,255,255,0.03)",
            zIndex: 0,
          }}
        />
        <Toolbar sx={{ py: 4, justifyContent: "center", position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", maxWidth: "1200px" }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontFamily: "Inter, sans-serif",
                letterSpacing: "2px",
                fontSize: { xs: "2rem", md: "3.2rem", lg: "3.8rem" },
                textTransform: "uppercase",
                textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                mb: 2,
                background: "linear-gradient(45deg, #ffffff, #e8f5e9)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Projeto Eco Escolas
            </Typography>
            <Box
              sx={{
                display: "inline-block",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(15px)",
                color: "white",
                px: 6,
                py: 2,
                borderRadius: 30,
                border: "2px solid rgba(255,255,255,0.3)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                mb: 3,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, fontSize: "1.3rem" }}>
                1ª EDIÇÃO • 2025
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                opacity: 0.95,
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
                fontSize: { xs: "1rem", md: "1.2rem" },
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              Começa o projeto Eco Escolas - Reciclando Ideias! Escolas municipais de Goiânia participam desta
              iniciativa que promove a coleta consciente de resíduos e a educação ambiental.
            </Typography>
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
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem", lg: "4.5rem" },
              fontWeight: 800,
              color: "#1B5E20",
              mb: 4,
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            O QUE É O
            <br />
            <Box component="span" sx={{ color: "#4CAF50" }}>
              PROJETO ECO ESCOLAS?
            </Box>
            <br />
          </Typography>
          <Box sx={{ mb: 6 }}>
            <Image
              src="/escolas_logo.jpeg"
              alt="Eco Escolas Logo"
              width={400}
              height={300}
              style={{ objectFit: "contain", borderRadius: "12px" }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: "#424242",
              mb: 8,
              maxWidth: "900px",
              mx: "auto",
              fontWeight: 400,
              lineHeight: 1.6,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
            }}
          >
            O projeto Esco Escolas é uma ação inovadora que traz nova abordagem à coleta seletiva, promovendo a
            conscientização, a transformação de atitudes e o despertar do senso de responsabilidade social e ambiental.
          </Typography>
        </Box>

        {/* Carrossel de Imagens com Textos */}
        <Paper
          sx={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: 6,
            p: { xs: 4, md: 8 },
            my: { xs: 6, md: 10 },
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            border: "1px solid rgba(76, 175, 80, 0.1)",
            color: "#2E2E2E",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              mb: 6,
              color: "#1B5E20",
              fontFamily: "Inter, sans-serif",
              textAlign: "center",
            }}
          >
            Explicando um pouco mais ...
          </Typography>
          <Box sx={{ width: "100%", maxWidth: 800, flexGrow: 1, position: "relative" }}>
            <Fade in={true} key={activeStep} timeout={500}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 4 }}>
                <Box sx={{ flexShrink: 0, width: { xs: "100%", md: "50%" }, textAlign: "center" }}>
                  <Image
                    src={carouselItems[activeStep].image || "/placeholder.svg"}
                    alt={carouselItems[activeStep].alt}
                    width={600}
                    height={400}
                    style={{
                      objectFit: "contain",
                      borderRadius: "12px",
                      maxWidth: "100%",
                      height: "auto",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    }}
                  />
                </Box>
                <Box sx={{ flexGrow: 1, width: { xs: "100%", md: "50%" }, textAlign: { xs: "center", md: "left" } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#424242",
                      lineHeight: 1.6,
                      fontSize: { xs: "1.1rem", md: "1.3rem" },
                      fontWeight: 400,
                    }}
                  >
                    {carouselItems[activeStep].text}
                  </Typography>
                </Box>
              </Box>
            </Fade>
          </Box>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              maxWidth: 800,
              width: "100%",
              mt: 4,
              background: "transparent",
              "& .MuiMobileStepper-dotActive": {
                backgroundColor: "#4CAF50",
              },
            }}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Próximo
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Anterior
              </Button>
            }
          />
        </Paper>

        {/* SEÇÃO MELHORADA: Como Funciona o Projeto */}
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
                  SISTEMA INOVADOR
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
                Como Funciona o Projeto
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
                Um ecossistema completo que transforma coleta seletiva em educação ambiental para{" "}
                <Box component="span" sx={{ color: "#4CAF50", fontWeight: 700 }}>
                  30 escolas municipais
                </Box>{" "}
                de Goiânia
              </Typography>

              {/* Badges informativos */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 8 }}>
                <Chip
                  icon={<School />}
                  label="30 Escolas Participantes"
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
                🎯  Sistema Engajante 
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
                      🏫 Participação das Escolas
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
                      <strong>30 escolas municipais</strong> participam do projeto, cada uma recebendo{" "}
                      <strong>4 bags especiais</strong> para coleta seletiva: uma para <strong>garrafas PET</strong>,
                      uma para <strong>latas de alumínio</strong>, uma para <strong>eletrônicos</strong> e uma para{" "}
                      <strong>papelão</strong>.
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
                      🎯 Sistema de Pontuação
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
                      Cada <strong>bag cheia</strong> equivale a <strong>1 ticket</strong>, que por sua vez vale{" "}
                      <strong>1 ponto</strong> no ranking. A escola que acumular mais pontos concorre a prêmios
                      incríveis como <strong>tablets</strong> e muito mais!
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
                    }}
                  >
                    Simplicidade que transforma educação em ação!
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
                  mb: 6,
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  textAlign: "center",
                }}
              >
                🗂️ Os 4 Tipos de Materiais
              </Typography>

              <Grid container spacing={4} justifyContent="center">
                {[
                  {
                    icon: <LocalDrink sx={{ fontSize: 48 }} />,
                    title: "Garrafas PET",
                    color: "#2196F3",
                    description: "Garrafas plásticas de bebidas, água e refrigerantes",
                    gradient: "linear-gradient(135deg, #2196F3, #1976D2)",
                  },
                  {
                    icon: <Box sx={{ fontSize: 48, fontWeight: 900 }}>Al</Box>,
                    title: "Latas de Alumínio",
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
                    title: "Papelão",
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

            {/* 3 Cards Principais Alinhados - MELHORADOS */}
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
                📈 Números que Impressionam
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
                    <Box
                      sx={{
                        position: "absolute",
                        top: -30,
                        right: -30,
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)",
                      }}
                    />
                    <Typography variant="h1" sx={{ fontWeight: 900, mb: 2, fontSize: "4.5rem", position: "relative" }}>
                      30
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, position: "relative" }}>
                      Escolas Participantes
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, position: "relative", fontSize: "1.1rem" }}>
                      Rede municipal de Goiânia engajada na transformação ambiental histórica
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
                    <Box
                      sx={{
                        position: "absolute",
                        top: -30,
                        right: -30,
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)",
                      }}
                    />
                    <Typography variant="h1" sx={{ fontWeight: 900, mb: 2, fontSize: "4.5rem", position: "relative" }}>
                      4
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, position: "relative" }}>
                      Tipos de Materiais
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, position: "relative", fontSize: "1.1rem" }}>
                      PET, Alumínio, Eletrônicos e Papelão separados conscientemente
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
                    <Box
                      sx={{
                        position: "absolute",
                        top: -30,
                        right: -30,
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)",
                      }}
                    />
                    <Tablet sx={{ fontSize: 80, mb: 2, position: "relative" }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, position: "relative" }}>
                      Prêmios Incríveis
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, position: "relative", fontSize: "1.1rem" }}>
                      Tablets e reconhecimento para as escolas mais engajadas
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Call to Action Final - MELHORADO */}
            <Box
              sx={{
                textAlign: "center",
                background: "linear-gradient(135deg, #4CAF50, #2E7D32, #1B5E20)",
                borderRadius: 6,
                p: 8,
                color: "white",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(76, 175, 80, 0.3)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -50,
                  left: -50,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -60,
                  right: -60,
                  width: 250,
                  height: 250,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                }}
              />

              <TrendingUpIcon sx={{ fontSize: 80, mb: 3, position: "relative" }} />

              <Typography
                variant="h3"
                sx={{ fontWeight: 800, mb: 4, position: "relative", fontSize: { xs: "2rem", md: "2.5rem" } }}
              >
                🚀 Transformando Educação em Ação
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 6,
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.7,
                  position: "relative",
                  fontSize: { xs: "1.2rem", md: "1.4rem" },
                }}
              >
                Cada escola tem o potencial de conquistar até <strong>4 pontos por coleta</strong>. Juntas, as 30
                escolas podem gerar {" "}
                <Box component="span" sx={{ fontSize: "1.6rem", fontWeight: 900, color: "#A5D6A7" }}>
                  120 pontos ou até mais de acordo com o engajamento
                </Box>{" "}
                o que impactará de forma grandiosa a educação ambiental da sociedade de Goiânia e o Estado!
              </Typography>

              <Box
                sx={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 4,
                  p: 4,
                  maxWidth: "600px",
                  mx: "auto",
                  position: "relative",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  💡 Impacto Esperado:
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  Esperamos que o envolvimento<strong>das escolas</strong>gere um impacto imensurável ,
                  <strong> tanto no ambiente escolar </strong> mas também em toda sociedade Goiana!
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Resto do código permanece igual... */}
        {/* Pilot Project Section */}
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
            🌱 O Início de Tudo
          </Typography>

          <Grid container spacing={8} alignItems="flex-start">
            <Grid item xs={12} md={6}>
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
                 Projeto Piloto de Educação Ambiental - Agosto/2024
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                  mb: 4,
                  textAlign: "justify",
                }}
              >
                Em agosto de 2024, a <strong>Prefeitura Municipal de Goiânia</strong>, através da Secretaria de
                Educação, em parceria estratégica com a <strong>Limpa Gyn</strong>, deu o primeiro passo para
                revolucionar a educação ambiental nas escolas municipais. O projeto piloto foi implementado em uma
                escola da região Noroeste de Goiânia, envolvendo alunos do 4º ao 7º ano do período matutino.
              </Typography>
              <Box
                sx={{
                  background: "linear-gradient(135deg, #E8F5E9, #F1F8E9)",
                  borderRadius: 4,
                  p: 4,
                  border: "2px solid rgba(76, 175, 80, 0.2)",
                  mb: 4,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#2E7D32",
                    fontWeight: 600,
                    mb: 3,
                    textAlign: "center",
                  }}
                >
                  🎯 Objetivos do Projeto Piloto
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="body1" sx={{ color: "#2E7D32", lineHeight: 1.6 }}>
                    • <strong>Testar a metodologia</strong> de educação ambiental em ambiente escolar real
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#2E7D32", lineHeight: 1.6 }}>
                    • <strong>Avaliar o engajamento</strong> dos alunos com práticas sustentáveis
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#2E7D32", lineHeight: 1.6 }}>
                    • <strong>Estabelecer parcerias</strong> com cooperativas de reciclagem locais
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#2E7D32", lineHeight: 1.6 }}>
                    • <strong>Medir o impacto social</strong> na comunidade escolar e familiar
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
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
                📚 Como Funcionou na Prática
              </Typography>
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    background: "white",
                    borderRadius: 3,
                    p: 3,
                    mb: 3,
                    border: "1px solid rgba(76, 175, 80, 0.2)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 600, mb: 2 }}>
                    🎒 Engajamento dos Alunos
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.7 }}>
                    Cada estudante se tornou um <strong>"Agente Ambiental"</strong>, responsável por levar materiais
                    recicláveis de casa (garrafas PET, latas de alumínio, papelão) e educar suas famílias sobre a
                    importância da separação correta dos resíduos.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    background: "white",
                    borderRadius: 3,
                    p: 3,
                    mb: 3,
                    border: "1px solid rgba(76, 175, 80, 0.2)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 600, mb: 2 }}>
                    📅 Coletas Programadas
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.7, mb: 2 }}>
                    <strong>1ª Coleta - 30/08/2024:</strong> Primeira experiência de coleta seletiva com grande
                    participação dos alunos e famílias.
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.7 }}>
                    <strong>2ª Coleta - 11/09/2024:</strong> Consolidação do aprendizado com aumento significativo na
                    qualidade da separação dos materiais.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    background: "white",
                    borderRadius: 3,
                    p: 3,
                    mb: 3,
                    border: "1px solid rgba(76, 175, 80, 0.2)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 600, mb: 2 }}>
                    🏭 Impacto nas Cooperativas
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.7 }}>
                    Os materiais foram organizados em <strong>bags de até 1000kg</strong> e distribuídos para{" "}
                    <strong>12 cooperativas de reciclagem</strong> cadastradas em Goiânia, gerando renda direta para
                    dezenas de famílias trabalhadoras.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                color: "#2E7D32",
                fontWeight: 600,
                mb: 6,
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              💬 Impacto Social Comprovado
            </Typography>
            <Grid container spacing={6}>
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
                  <Box
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "rgba(76, 175, 80, 0.1)",
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#2E7D32",
                      fontStyle: "italic",
                      fontWeight: 500,
                      lineHeight: 1.7,
                      fontSize: "1.3rem",
                      position: "relative",
                      mb: 3,
                    }}
                  >
                    "As cooperativas vendem os materiais recicláveis, gerando renda para suas atividades e empregando
                    muitas famílias que dependem desse trabalho para seu sustento. O projeto piloto mostrou que é
                    possível unir educação, sustentabilidade e impacto social positivo."
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#4CAF50",
                      fontWeight: 600,
                      textAlign: "right",
                      position: "relative",
                    }}
                  >
                    — Coordenação do Projeto Piloto
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

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
              🌟 O Legado do Projeto Piloto
            </Typography>
            <Typography variant="h6" sx={{ lineHeight: 1.7, position: "relative", maxWidth: "800px", mx: "auto" }}>
              Este projeto piloto, desenvolvido pela <strong>Prefeitura de Goiânia</strong> em parceria com a{" "}
              <strong>Limpa Gyn</strong>, não apenas validou nossa metodologia, mas também demonstrou que é possível
              transformar a educação ambiental em uma ferramenta poderosa de mudança social. Os resultados obtidos em
              agosto de 2024 são a base sólida sobre a qual construímos o atual Projeto Eco Escolas 2025.
            </Typography>
          </Box>
        </Paper>

        {/* Partnership Section */}
        <Paper
          sx={{
            background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
            borderRadius: 6,
            p: { xs: 4, md: 8 },
            my: { xs: 6, md: 10 },
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              mb: 8,
              fontFamily: "Inter, sans-serif",
              color: "#2E2E2E",
            }}
          >
            Uma Parceria Transformadora
          </Typography>
          <Grid container spacing={8} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  textAlign: "center",
                  background: "white",
                  borderRadius: 4,
                  p: 5,
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: "1px solid rgba(76, 175, 80, 0.1)",
                }}
              >
                <Image
                  src="/prefeitura.png"
                  alt="Logo Prefeitura de Goiânia"
                  width={160}
                  height={160}
                  style={{ objectFit: "contain", margin: "0 auto" }}
                />
                <Typography variant="h4" sx={{ mt: 3, fontWeight: 700, color: "#2E7D32" }}>
                  Prefeitura de Goiânia
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, color: "#666", fontWeight: 500 }}>
                  Secretaria Municipal de Educação
                </Typography>
                <Typography variant="body1" sx={{ mt: 3, color: "#888", lineHeight: 1.6 }}>
                  Pioneira na criação desta primeira edição do projeto Eco Escolas coordenando a implementação
                  pedagógica inovadora e o desenvolvimento do currículo de educação sustentável
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  textAlign: "center",
                  background: "white",
                  borderRadius: 4,
                  p: 5,
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: "1px solid rgba(76, 175, 80, 0.1)",
                }}
              >
                <Image
                  src="/logolimpa.png"
                  alt="Limpa Gyn"
                  width={160}
                  height={160}
                  style={{ objectFit: "contain", margin: "0 auto" }}
                />
                <Typography variant="h4" sx={{ mt: 3, fontWeight: 700, color: "#2E7D32" }}>
                  Limpa Gyn
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, color: "#666", fontWeight: 500 }}>
                  Parceira Técnica Especializada
                </Typography>
                <Typography variant="body1" sx={{ mt: 3, color: "#888", lineHeight: 1.6 }}>
                  Trazendo expertise técnica em gestão de resíduos urbanos, oferecendo conhecimento prático e suporte
                  especializado para esta primeira experiência projeto de conscientização sustentável
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              mt: 8,
              textAlign: "center",
              background: "white",
              borderRadius: 4,
              p: 5,
              boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
              border: "1px solid rgba(76, 175, 80, 0.1)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                maxWidth: "900px",
                mx: "auto",
                lineHeight: 1.7,
                color: "#555",
                fontWeight: 400,
                fontSize: "1.2rem",
              }}
            >
              Juntos, criamos algo nunca visto antes em Goiânia: um projeto de conscientização onde o verdadeiro prêmio
              é a transformação ambiental. Esta parceria une conhecimento educacional e expertise técnica para inaugurar
              uma nova era na consciência ecológica da nossa cidade.
            </Typography>
          </Box>
        </Paper>

        {/* Objectives Section */}
        <Box sx={{ py: { xs: 6, md: 10 } }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              color: "#1B5E20",
              mb: 3,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Nossos Objetivos Pioneiros
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "#666",
              mb: 10,
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Os pilares inovadores que sustentam esta primeira experiência de projeto de conscientização ambiental
            escolar em Goiânia
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid container spacing={4} sx={{ maxWidth: "1400px" }} justifyContent="center" alignItems="stretch">
              {[
                {
                  icon: <MenuBook sx={{ fontSize: 52, color: "#4CAF50" }} />,
                  title: "Educação Colaborativa",
                  description:
                    "Pela primeira vez, transformar o aprendizado ambiental em uma experiência projeto de conscientização saudável, onde escolas se desafiam para criar a melhor educação sustentável da cidade.",
                },
                {
                  icon: <Recycling sx={{ fontSize: 52, color: "#4CAF50" }} />,
                  title: "Coleta Premiada",
                  description:
                    "Implementar o primeiro sistema de coleta seletiva projeto de conscientização entre escolas municipais, onde a qualidade e consciência na separação de resíduos são reconhecidas e premiadas.",
                },
                {
                  icon: <School sx={{ fontSize: 52, color: "#4CAF50" }} />,
                  title: "Escolas Campeãs",
                  description:
                    "Criar as primeiras 'Escolas Campeãs da Sustentabilidade' de Goiânia, estabelecendo novos padrões de excelência ambiental que servirão de modelo para toda a rede municipal.",
                },
                {
                  icon: <Groups sx={{ fontSize: 52, color: "#4CAF50" }} />,
                  title: "Projeto Colaborativo",
                  description:
                    " Onde o projeto de conscientização significa colaborar com o meio ambiente, criando uma rede de escolas que se desafiam para ser mais sustentáveis.",
                },
                {
                  icon: <TrendingUp sx={{ fontSize: 52, color: "#4CAF50" }} />,
                  title: "Crescimento Inovador",
                  description:
                    "Estabelecer métricas de sustentabilidade escolar, criando o primeiro ranking ambiental das escolas municipais de Goiânia com premiações e reconhecimentos.",
                },
                {
                  icon: <InsertChart sx={{ fontSize: 52, color: "#4CAF50" }} />,
                  title: "Transparência do Projeto",
                  description:
                    "Criar o primeiro sistema público de acompanhamento do projeto de conscientização ambiental, onde toda a cidade pode ver o progresso das escolas em tempo real.",
                },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 5,
                      border: "1px solid rgba(76, 175, 80, 0.1)",
                      boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 15px 45px rgba(76, 175, 80, 0.15)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 4,
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: "#1B5E20",
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
                          color: "#666",
                          lineHeight: 1.7,
                          fontSize: "0.95rem",
                          flexGrow: 1,
                          display: "flex",
                          alignItems: "center",
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
        </Box>

        {/* Impact Vision Section */}
        <Paper
          sx={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: 6,
            p: { xs: 4, md: 8 },
            my: { xs: 6, md: 10 },
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            textAlign: "center",
            border: "1px solid rgba(76, 175, 80, 0.1)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              color: "#1B5E20",
              mb: 6,
              fontFamily: "Inter, sans-serif",
            }}
          >
            O Impacto Pioneiro que Buscamos
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
                  borderRadius: 4,
                  p: 5,
                  color: "white",
                  height: "100%",
                  boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                  }}
                />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, position: "relative" }}>
                  Primeiros Meses
                </Typography>
                <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", mb: 3 }} />
                <Typography variant="body1" sx={{ lineHeight: 1.7, position: "relative" }}>
                  Estabelecer a primeira projeto de conscientização ambiental entre escolas, criando engajamento
                  imediato e implementando práticas sustentáveis inovadoras em toda a rede municipal.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  background: "linear-gradient(135deg, #66BB6A, #4CAF50)",
                  borderRadius: 4,
                  p: 5,
                  color: "white",
                  height: "100%",
                  boxShadow: "0 8px 25px rgba(102, 187, 106, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                  }}
                />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, position: "relative" }}>
                  Primeiro Ano
                </Typography>
                <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", mb: 3 }} />
                <Typography variant="body1" sx={{ lineHeight: 1.7, position: "relative" }}>
                  Expandir o modelo projeto de conscientização para toda a cidade, criando a primeira rede de 'Escolas
                  Campeãs da Sustentabilidade' e inspirando outras cidades do Estado a seguir o exemplo.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  background: "linear-gradient(135deg, #81C784, #66BB6A)",
                  borderRadius: 4,
                  p: 5,
                  color: "white",
                  height: "100%",
                  boxShadow: "0 8px 25px rgba(129, 199, 132, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                  }}
                />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, position: "relative" }}>
                  Legado Futuro
                </Typography>
                <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", mb: 3 }} />
                <Typography variant="body1" sx={{ lineHeight: 1.7, position: "relative" }}>
                  Estabelecer Goiânia como a primeira capital brasileira da educação ambiental projeto de
                  conscientização, criando um modelo replicável nacionalmente e formando gerações ambientalmente
                  conscientes.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Launch Event Section */}
        <Paper
          sx={{
            background: "white",
            borderRadius: 6,
            p: { xs: 4, md: 8 },
            my: { xs: 6, md: 10 },
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            textAlign: "center",
            border: "1px solid rgba(76, 175, 80, 0.1)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              color: "#1B5E20",
              mb: 6,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Evento de Lançamento
          </Typography>
          <Box sx={{ mb: 6 }}>
            <Image
              src="/banner.jpeg"
              alt="Banner do Evento de Lançamento"
              width={800}
              height={1000}
              style={{ objectFit: "contain", borderRadius: "12px", maxWidth: "100%", height: "auto" }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "#424242",
              maxWidth: "900px",
              mx: "auto",
              fontWeight: 400,
              lineHeight: 1.6,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
            }}
          >
            Participe do lançamento oficial do Projeto Eco Escolas e faça parte desta transformação ambiental em
            Goiânia!
          </Typography>
        </Paper>

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
            Acompanhe o desenvolvimento desta projeto de conscientização e veja como cada escola está fazendo história
            na educação ambiental da nossa cidade.
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
              {isLoading ? "Carregando..." : "Acompanhar o Progresso da Eco Escolas"}
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
                Primeira edição do projeto de conscientização ambiental escolar da história de Goiânia - uma iniciativa
                nova.
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
                      Limpa Gyn
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
            <br />A primeira projeto de conscientização ambiental escolar de Goiânia - Uma iniciativa nova da Secretaria
            Municipal de Educação em parceria com a Limpa Gyn
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
