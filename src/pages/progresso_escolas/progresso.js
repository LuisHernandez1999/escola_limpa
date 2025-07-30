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
  CircularProgress,
  Alert,
} from "@mui/material"
import { EmojiEvents, School, TrendingUp, Assignment, CalendarToday } from "@mui/icons-material"
import Image from "next/image"
import {
  top10EscolasMaisPontos,
  bottom5EscolasMenosPontos,
  listarTotaisPorEscolaPaginado,
} from "@/service/service_dados"

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

export default function SchoolProgress() {
  // Estados para os dados da API
  const [topSchools, setTopSchools] = useState([])
  const [bottomSchools, setBottomSchools] = useState([])
  const [recentRegistrations, setRecentRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Carregar dados da API
  useEffect(() => {
    const loadData = async () => {
      console.log("🚀 [PAGE] Iniciando carregamento de dados...")

      try {
        setLoading(true)
        setError(null)

        console.log("📡 [PAGE] Fazendo chamadas para todas as APIs em paralelo...")

        // Testar cada API individualmente primeiro
        console.log("🧪 [PAGE] Testando listarTotaisPorEscolaPaginado...")
        const listResult = await listarTotaisPorEscolaPaginado(1, 10)
        console.log("🧪 [PAGE] Resultado de listarTotaisPorEscolaPaginado:", listResult)
        console.log("🧪 [PAGE] Tipo do resultado:", typeof listResult)
        console.log("🧪 [PAGE] Propriedades do resultado:", Object.keys(listResult))

        console.log("🧪 [PAGE] Testando top10EscolasMaisPontos...")
        const topResult = await top10EscolasMaisPontos()
        console.log("🧪 [PAGE] Resultado de top10EscolasMaisPontos:", topResult)

        console.log("🧪 [PAGE] Testando bottom5EscolasMenosPontos...")
        const bottomResult = await bottom5EscolasMenosPontos()
        console.log("🧪 [PAGE] Resultado de bottom5EscolasMenosPontos:", bottomResult)

        console.log("✅ [PAGE] Todos os resultados recebidos:")
        console.log("🏆 [PAGE] Top 10 Result:", topResult)
        console.log("📈 [PAGE] Bottom 5 Result:", bottomResult)
        console.log("📋 [PAGE] Lista Result:", listResult)

        // Verificar erros individualmente
        if (topResult.erro) {
          console.error("❌ [PAGE] Erro no Top 10:", topResult.erro)
          throw new Error(`Top 10: ${topResult.erro}`)
        }
        if (bottomResult.erro) {
          console.error("❌ [PAGE] Erro no Bottom 5:", bottomResult.erro)
          throw new Error(`Bottom 5: ${bottomResult.erro}`)
        }
        if (listResult.erro) {
          console.error("❌ [PAGE] Erro na Lista:", listResult.erro)
          throw new Error(`Lista completa: ${listResult.erro}`)
        }

        console.log("🔄 [PAGE] Iniciando mapeamento dos dados para a UI...")

        // Mapear dados do top 10 para o formato esperado pela UI
        const mappedTopSchools = topResult.resultados.map((escola, index) => {
          const mapped = {
            name: escola.escolaNome,
            points: escola.pontos,
            collections: Math.floor(escola.pontos / 50), // Estimativa baseada nos pontos
            trend: `+${Math.floor(Math.random() * 20 + 1)}%`, // Trend simulado
          }
          console.log(`🏆 [PAGE] Top escola ${index + 1} mapeada:`, mapped)
          return mapped
        })

        // Mapear dados do bottom 5 para o formato esperado pela UI
        const mappedBottomSchools = bottomResult.resultados.map((escola, index) => {
          const mapped = {
            name: escola.escolaNome,
            points: escola.pontos,
            collections: Math.floor(escola.pontos / 50), // Estimativa baseada nos pontos
            trend: `+${Math.floor(Math.random() * 10 + 1)}%`, // Trend simulado
          }
          console.log(`📈 [PAGE] Bottom escola ${index + 1} mapeada:`, mapped)
          return mapped
        })

        // Mapear dados da lista completa para registros recentes
        const mappedRecentRegistrations = listResult.resultados.map((escola, index) => {
          console.log(`📋 [PAGE] Processando escola ${index + 1} para registros:`, escola)

          const materiais = []
          if (escola.totalPlastico > 0) materiais.push("Plástico")
          if (escola.totalPapel > 0) materiais.push("Papel")
          if (escola.totalAluminio > 0) materiais.push("Alumínio")
          if (escola.totalEletronico > 0) materiais.push("Eletrônico")

          // Determinar volume baseado nos totais
          let volume = "Bag Vazio"
          if (escola.totalCheio > 0) volume = "Bag Cheio"
          else if (escola.totalSemiCheio > 0) volume = "Bag Semi Cheio"

          // Formatar data se disponível
          let dataFormatada = "28/01/2025"
          let horaFormatada = `${10 + index}:${30 + ((index * 15) % 60)}`

          if (escola.dataMaisRecente) {
            const data = new Date(escola.dataMaisRecente)
            dataFormatada = data.toLocaleDateString("pt-BR")
            horaFormatada = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
          }

          const mapped = {
            id: index + 1,
            school: escola.nomeEscola,
            date: dataFormatada,
            time: horaFormatada,
            collector: `Coletor ${index + 1}`, // Simulado pois não vem da API
            materials: materiais.length > 0 ? materiais : ["Sem materiais"],
            volume: volume,
          }

          console.log(`📋 [PAGE] Registro ${index + 1} mapeado:`, mapped)
          return mapped
        })

        console.log("✅ [PAGE] Todos os dados mapeados com sucesso!")
        console.log("🏆 [PAGE] Top Schools Final:", mappedTopSchools)
        console.log("📈 [PAGE] Bottom Schools Final:", mappedBottomSchools)
        console.log("📋 [PAGE] Recent Registrations Final:", mappedRecentRegistrations)

        setTopSchools(mappedTopSchools)
        setBottomSchools(mappedBottomSchools)
        setRecentRegistrations(mappedRecentRegistrations)

        console.log("🎉 [PAGE] Estados atualizados com sucesso!")
      } catch (err) {
        console.error("💥 [PAGE] Erro durante o carregamento:", err)
        console.error("💥 [PAGE] Stack trace:", err.stack)
        setError(err.message)
      } finally {
        console.log("🏁 [PAGE] Finalizando carregamento...")
        setLoading(false)
      }
    }

    loadData()
  }, [])

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

  // Componente de loading
  if (loading) {
    return (
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#4CAF50", mb: 2 }} />
        <Typography variant="h6" sx={{ color: "#2C3E50" }}>
          Carregando dados das escolas...
        </Typography>
      </Box>
    )
  }

  // Componente de erro
  if (error) {
    return (
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Alert severity="error" sx={{ mb: 2, maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Erro ao carregar dados
          </Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </Box>
    )
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
                        pontos
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
                        pontos
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
                    Data
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
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {registration.date}
                        </Typography>
                      </Box>
                    </TableCell>
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
