"use client"
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
  LinearProgress,
} from "@mui/material"
import { EmojiEvents, School, TrendingUp, Assignment, CalendarToday } from "@mui/icons-material"
import Image from "next/image"

// Componente para o relógio em tempo real
function LiveClock() {
  const [time, setTime] = useState(dayjs())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const timer = setInterval(() => {
      setTime(dayjs())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!isClient) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 0.2,
          minWidth: { xs: "100px", sm: "150px" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#444444",
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.4rem" },
            letterSpacing: "0.03em",
            textAlign: "right",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          --:--:--
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#777777",
            fontSize: { xs: "0.7rem", sm: "0.85rem" },
            textAlign: "right",
            letterSpacing: "0.02em",
          }}
        >
          --/--/----
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 0.2,
        minWidth: { xs: "100px", sm: "150px" },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#444444",
          fontWeight: 600,
          fontSize: { xs: "1rem", sm: "1.4rem" },
          letterSpacing: "0.03em",
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {time.format("HH:mm:ss")}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "#777777",
          fontSize: { xs: "0.7rem", sm: "0.85rem" },
          textAlign: "right",
          letterSpacing: "0.02em",
        }}
      >
        {time.format("DD/MM/YYYY")}
      </Typography>
    </Box>
  )
}

// Dados mockados para demonstração
const topSchools = [
  { name: "Escola Municipal João Silva", points: 2850, collections: 45, trend: "+12%" },
  { name: "CMEI Maria Eduarda", points: 2720, collections: 42, trend: "+8%" },
  { name: "Escola Estadual Santos Dumont", points: 2650, collections: 38, trend: "+15%" },
  { name: "Colégio Municipal Verde Vida", points: 2580, collections: 41, trend: "+5%" },
  { name: "Escola Municipal Natureza", points: 2450, collections: 35, trend: "+18%" },
  { name: "CMEI Pequenos Ecologistas", points: 2380, collections: 33, trend: "+7%" },
  { name: "Escola Municipal Reciclar", points: 2320, collections: 31, trend: "+10%" },
  { name: "Colégio Estadual Meio Ambiente", points: 2280, collections: 29, trend: "+6%" },
  { name: "Escola Municipal Sustentável", points: 2150, collections: 28, trend: "+9%" },
  { name: "CMEI Futuro Verde", points: 2080, collections: 26, trend: "+4%" },
]

const bottomSchools = [
  { name: "Escola Municipal Início Verde", points: 450, collections: 8, trend: "-2%" },
  { name: "CMEI Aprendendo Reciclar", points: 520, collections: 9, trend: "+1%" },
  { name: "Escola Estadual Nova Chance", points: 680, collections: 12, trend: "+3%" },
  { name: "Colégio Municipal Crescer", points: 750, collections: 14, trend: "+5%" },
  { name: "Escola Municipal Esperança", points: 820, collections: 15, trend: "+2%" },
]

const recentRegistrations = [
  {
    id: 1,
    school: "Escola Municipal João Silva",
    date: "28/01/2025",
    time: "14:30",
    collector: "Carlos Santos",
    materials: ["Plástico", "Papel"],
    volume: "Bag Cheio",
  },
  {
    id: 2,
    school: "CMEI Maria Eduarda",
    date: "28/01/2025",
    time: "13:45",
    collector: "Ana Costa",
    materials: ["Alumínio", "Eletrônico"],
    volume: "Bag Semi Cheio",
  },
  {
    id: 3,
    school: "Escola Estadual Santos Dumont",
    date: "28/01/2025",
    time: "12:20",
    collector: "Pedro Lima",
    materials: ["Plástico", "Papel", "Alumínio"],
    volume: "Bag Cheio",
  },
  {
    id: 4,
    school: "Colégio Municipal Verde Vida",
    date: "28/01/2025",
    time: "11:15",
    collector: "Maria Silva",
    materials: ["Papel"],
    volume: "Bag Semi Cheio",
  },
  {
    id: 5,
    school: "Escola Municipal Natureza",
    date: "28/01/2025",
    time: "10:30",
    collector: "João Oliveira",
    materials: ["Plástico", "Eletrônico"],
    volume: "Bag Cheio",
  },
]

export default function SchoolProgress() {
  const getPositionColor = (position) => {
    if (position === 1) return "#FFD700" // Ouro
    if (position === 2) return "#C0C0C0" // Prata
    if (position === 3) return "#CD7F32" // Bronze
    return "#4CAF50" // Verde padrão
  }

  const getVolumeColor = (volume) => {
    switch (volume) {
      case "Bag Cheio":
        return "#4CAF50"
      case "Bag Semi Cheio":
        return "#FF9800"
      case "Bag Vazio":
        return "#F44336"
      default:
        return "#9E9E9E"
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Camada de Fundo com Imagem e Desfoque */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('/criancada.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "blur(5px)",
          WebkitFilter: "blur(7px)",
          zIndex: -1,
        }}
      />

      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(to right, #F8F9FA, #E9ECEF, #F8F9FA)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05), inset 0 -1px 0 rgba(0,0,0,0.03)",
          borderBottom: "1px solid #DEE2E6",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          py: { xs: 1.5, sm: 2 },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            px: { xs: 2, sm: 6 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 3 } }}>
            <Image
              src="/escolas_logo.jpeg"
              alt="Logo Limpa Gyn"
              width={160}
              height={120}
              style={{ objectFit: "contain" }}
            />
            <Box>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: "#2C3E50",
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  fontSize: { xs: "1.4rem", sm: "2.2rem" },
                  textShadow: "none",
                }}
              >
                Progresso das Escolas
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#555555",
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  fontSize: { xs: "0.7rem", sm: "0.9rem" },
                  mt: 0.5,
                }}
              >
                Acompanhamento de Desempenho e Coletas
              </Typography>
            </Box>
          </Box>
          <LiveClock />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 4, pb: 8 }}>
        {/* Top 10 Escolas com Mais Pontos */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 2, sm: 4 },
            mb: 4,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            border: "1px solid #F0F0F0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "center" }}>
            <EmojiEvents sx={{ color: "#FFD700", fontSize: 32, mr: 2 }} />
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: "#388E3C",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              TOP 10 ESCOLAS - MAIORES PONTUAÇÕES
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {topSchools.map((school, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
                <Card
                  sx={{
                    height: "280px", // Altura fixa para uniformidade
                    display: "flex",
                    flexDirection: "column",
                    background:
                      index < 3
                        ? `linear-gradient(135deg, ${getPositionColor(index + 1)}15, ${getPositionColor(index + 1)}05)`
                        : "linear-gradient(135deg, #4CAF5015, #4CAF5005)",
                    border: `2px solid ${getPositionColor(index + 1)}`,
                    borderRadius: 2,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: getPositionColor(index + 1),
                            color: "white",
                            fontWeight: "bold",
                            width: 40,
                            height: 40,
                            fontSize: "1.2rem",
                          }}
                        >
                          {index + 1}
                        </Avatar>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "#2C3E50",
                          mb: 2,
                          minHeight: "3em",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          lineHeight: 1.2,
                        }}
                      >
                        {school.name}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          color: getPositionColor(index + 1),
                          fontWeight: "bold",
                          mb: 1,
                          fontSize: "2rem",
                        }}
                      >
                        {school.points.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666", display: "block", mb: 2 }}>
                        {school.collections} coletas realizadas
                      </Typography>
                      <Chip
                        label={school.trend}
                        size="medium"
                        sx={{
                          bgcolor: school.trend.includes("+") ? "#4CAF5020" : "#F4433620",
                          color: school.trend.includes("+") ? "#4CAF50" : "#F44336",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Top 5 Escolas com Menos Pontos */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 2, sm: 4 },
            mb: 4,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            border: "1px solid #F0F0F0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "center" }}>
            <TrendingUp sx={{ color: "#FF9800", fontSize: 32, mr: 2 }} />
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: "#388E3C",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              TOP 5 ESCOLAS - OPORTUNIDADES DE CRESCIMENTO
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {bottomSchools.map((school, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
                <Card
                  sx={{
                    height: "320px", // Altura fixa maior para acomodar a barra de progresso
                    display: "flex",
                    flexDirection: "column",
                    background: "linear-gradient(135deg, #FF980015, #FF980005)",
                    border: "2px solid #FF9800",
                    borderRadius: 2,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Box>
                      <School sx={{ color: "#FF9800", fontSize: 40, mb: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "#2C3E50",
                          mb: 2,
                          minHeight: "3em",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          lineHeight: 1.2,
                        }}
                      >
                        {school.name}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          color: "#FF9800",
                          fontWeight: "bold",
                          mb: 1,
                          fontSize: "2rem",
                        }}
                      >
                        {school.points.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666", display: "block", mb: 2 }}>
                        {school.collections} coletas realizadas
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ color: "#666", mb: 1, display: "block" }}>
                          Progresso para próximo nível
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(school.points / 1000) * 100}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "#FF980020",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "#FF9800",
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>

                      <Chip
                        label={school.trend}
                        size="medium"
                        sx={{
                          bgcolor: school.trend.includes("+") ? "#4CAF5020" : "#F4433620",
                          color: school.trend.includes("+") ? "#4CAF50" : "#F44336",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Tabela de Novos Cadastros */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            border: "1px solid #F0F0F0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "center" }}>
            <Assignment sx={{ color: "#2196F3", fontSize: 32, mr: 2 }} />
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: "#388E3C",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              NOVOS CADASTROS DE FORMULÁRIOS
            </Typography>
          </Box>

          <TableContainer
            sx={{
              borderRadius: 2,
              border: "1px solid #E0E0E0",
              maxHeight: 600,
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      bgcolor: "#4CAF50",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    Escola
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#4CAF50",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    Data/Hora
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#4CAF50",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    Coletor
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#4CAF50",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    Materiais
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#4CAF50",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    Volume
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentRegistrations.map((registration) => (
                  <TableRow
                    key={registration.id}
                    sx={{
                      "&:nth-of-type(odd)": {
                        bgcolor: "#F8F9FA",
                      },
                      "&:hover": {
                        bgcolor: "#E8F5E8",
                        transform: "scale(1.01)",
                        transition: "all 0.2s ease-in-out",
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500, color: "#2C3E50" }}>{registration.school}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CalendarToday sx={{ color: "#666", fontSize: 16 }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {registration.date}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#666" }}>
                            {registration.time}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "#2C3E50" }}>{registration.collector}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {registration.materials.map((material, index) => (
                          <Chip
                            key={index}
                            label={material}
                            size="small"
                            sx={{
                              bgcolor: "#4CAF5015",
                              color: "#4CAF50",
                              fontSize: "0.75rem",
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={registration.volume}
                        sx={{
                          bgcolor: `${getVolumeColor(registration.volume)}15`,
                          color: getVolumeColor(registration.volume),
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      {/* Footer */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(to right, #F8F9FA, #E9ECEF, #F8F9FA)",
          py: { xs: 1.5, sm: 2 },
          boxShadow: "0 -8px 30px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(0,0,0,0.03)",
          borderTop: "1px solid #DEE2E6",
          position: "relative",
          bottom: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: "center", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#2C3E50",
              fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 500,
              letterSpacing: "0.02em",
              fontSize: { xs: "1rem", sm: "1.4rem" },
              textAlign: "center",
            }}
          >
            Parceria Limpa Gyn e Prefeitura de Goiânia
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center" }}>
            <Image src="/logolimpa.png" alt="Logo Limpa Gyn" width={50} height={50} style={{ objectFit: "contain" }} />
            <Image
              src="/prefeitura.png"
              alt="Logo Prefeitura de Goiânia"
              width={60}
              height={60}
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Divider sx={{ width: "15%", bgcolor: "rgba(150,150,150,0.5)", height: "2px", my: 0.5 }} />
          <Typography
            variant="body2"
            color="#777777"
            sx={{ fontSize: { xs: "0.85rem", sm: "1rem" }, textAlign: "center" }}
          >
            &copy; {new Date().getFullYear()} Limpa Gyn. Todos os direitos reservados.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
