"use client"
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  Pagination,
  Stack,
  Autocomplete,
  TextField,
  Modal,
  Button,
  Grid, // Adicionado para layout
} from "@mui/material"
import {
  EmojiEvents,
  School,
  TrendingUp,
  Assignment,
  CalendarToday,
  RecyclingOutlined,
  DescriptionOutlined,
  BatteryChargingFullOutlined,
  PhoneAndroidOutlined,
  LocalOfferOutlined,
  Close as CloseIcon, // Adicionado para o botão de fechar
  Star as StarIcon, // Ícone para pontos
  DateRange as DateRangeIcon, // Ícone para data
  Category as CategoryIcon, // Ícone genérico para materiais
  Storage as StorageIcon, // Ícone para volume
} from "@mui/icons-material"
import Image from "next/image"

// Assumindo que estas funções estão definidas em service_dados.js
// Para fins de demonstração, estou usando dados mockados.
// Você deve ter seu service_dados.js com as implementações reais.
import { listarTotaisPorEscolaPaginado, getRankingEscolasPontos } from "@/service/service_dados"

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
  const [allSchools, setAllSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize] = useState(10)
  // Estados para busca e filtragem
  const [topSchoolsSearchTerm, setTopSchoolsSearchTerm] = useState("")
  const [filteredTopSchools, setFilteredTopSchools] = useState([])
  const [allSchoolsSearchTerm, setAllSchoolsSearchTerm] = useState("")
  const [filteredAllSchoolsPaginated, setFilteredAllSchoolsPaginated] = useState([])

  // Estados para o modal
  const [openModal, setOpenModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalType, setModalType] = useState("") // "topSchools" or "allSchools"

  const handleOpenModal = (item, type) => {
    setSelectedItem(item)
    setModalType(type)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedItem(null)
    setModalType("")
  }

  // Carregar dados da API
  useEffect(() => {
    const loadData = async () => {
      console.log("🚀 [PAGE] Iniciando carregamento de dados...")
      try {
        setLoading(true)
        setError(null)
        // Carregar ranking das escolas
        console.log("📡 [PAGE] Carregando ranking das escolas...")
        const rankingResult = await getRankingEscolasPontos()
        console.log("🏆 [PAGE] Resultado do ranking:", rankingResult)
        if (rankingResult.top_10_escolas) {
          setTopSchools(rankingResult.top_10_escolas)
          setFilteredTopSchools(rankingResult.top_10_escolas) // Inicializa a lista filtrada
        }
        if (rankingResult.bottom_5_escolas) {
          setBottomSchools(rankingResult.bottom_5_escolas)
        }
        console.log("✅ [PAGE] Ranking carregado com sucesso!")
      } catch (err) {
        console.error("💥 [PAGE] Erro durante o carregamento do ranking:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Efeito para filtrar topSchools quando o termo de busca muda
  useEffect(() => {
    if (topSchoolsSearchTerm) {
      setFilteredTopSchools(
        topSchools.filter((school) => school.escola_nome.toLowerCase().includes(topSchoolsSearchTerm.toLowerCase())),
      )
    } else {
      setFilteredTopSchools(topSchools)
    }
  }, [topSchoolsSearchTerm, topSchools])

  // Carregar dados paginados
  useEffect(() => {
    const loadPaginatedData = async () => {
      console.log(`🚀 [PAGE] Carregando dados da página ${currentPage}...`)
      try {
        const listResult = await listarTotaisPorEscolaPaginado(currentPage, pageSize)
        console.log("📋 [PAGE] Resultado da lista paginada:", listResult)
        if (listResult.erro) {
          throw new Error(listResult.erro)
        }
        if (listResult.sucesso) {
          setAllSchools(listResult.resultados)
          // Aplica o filtro de busca imediatamente após buscar os dados paginados
          const currentFiltered = listResult.resultados.filter((school) =>
            school.nomeEscola.toLowerCase().includes(allSchoolsSearchTerm.toLowerCase()),
          )
          setFilteredAllSchoolsPaginated(currentFiltered)
          setTotalPages(Math.ceil(listResult.totalEscolas / pageSize))
        }
        console.log("✅ [PAGE] Dados paginados carregados com sucesso!")
      } catch (err) {
        console.error("💥 [PAGE] Erro durante o carregamento dos dados paginados:", err)
        setError(err.message)
      }
    }
    if (!loading) {
      loadPaginatedData()
    }
  }, [currentPage, pageSize, loading, allSchoolsSearchTerm]) // allSchoolsSearchTerm como dependência

  // Efeito para filtrar allSchools (na página atual) quando o termo de busca muda
  useEffect(() => {
    if (allSchoolsSearchTerm) {
      setFilteredAllSchoolsPaginated(
        allSchools.filter((school) => school.nomeEscola.toLowerCase().includes(allSchoolsSearchTerm.toLowerCase())),
      )
    } else {
      setFilteredAllSchoolsPaginated(allSchools)
    }
  }, [allSchoolsSearchTerm, allSchools])

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

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

  const getMaterialIcon = (material) => {
    switch (material.toLowerCase()) {
      case "plástico":
        return <RecyclingOutlined sx={{ fontSize: 16 }} />
      case "papel":
        return <DescriptionOutlined sx={{ fontSize: 16 }} />
      case "alumínio":
        return <BatteryChargingFullOutlined sx={{ fontSize: 16 }} />
      case "eletrônico":
        return <PhoneAndroidOutlined sx={{ fontSize: 16 }} />
      default:
        return <LocalOfferOutlined sx={{ fontSize: 16 }} />
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
          backgroundImage: `url('/criancada.png')`,
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
        {/* Tabela Top 10 Escolas com Mais Pontos - VERDE */}
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
                color: "#4CAF50",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              RANKING ESCOLAR - POSICIONAMENTO GERAL
            </Typography>
          </Box>
          {/* Input de busca para Top 10 Escolas */}
          <Autocomplete
            freeSolo
            options={topSchools.map((school) => school.escola_nome)}
            onInputChange={(event, newInputValue) => {
              setTopSchoolsSearchTerm(newInputValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar escola"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px", // Mais arredondado
                    "& fieldset": {
                      borderColor: "#E0E0E0", // Borda mais clara
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    },
                    "&:hover fieldset": {
                      borderColor: "#A5D6A7", // Verde suave no hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#81C784", // Verde um pouco mais forte no focus
                      boxShadow: "0 2px 8px rgba(76, 175, 80, 0.1)", // Sombra sutil no focus
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#757575", // Cor do label mais suave
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#4CAF50", // Verde no label focado
                  },
                }}
              />
            )}
            sx={{ mb: 3 }}
          />
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
                      textAlign: "center",
                    }}
                  >
                    Posição
                  </TableCell>
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
                      textAlign: "center",
                    }}
                  >
                    Pontos
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTopSchools.map((school, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleOpenModal(school, "topSchools")}
                    sx={{
                      "&:nth-of-type(odd)": {
                        bgcolor: index < 3 ? `${getPositionColor(index + 1)}10` : "#4CAF5010",
                      },
                      "&:hover": {
                        bgcolor: index < 3 ? `${getPositionColor(index + 1)}20` : "#4CAF5020",
                        transform: "scale(1.01)",
                        transition: "all 0.2s ease-in-out",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell sx={{ textAlign: "center" }}>
                      <Avatar
                        sx={{
                          bgcolor: getPositionColor(index + 1),
                          color: "white",
                          fontWeight: "bold",
                          width: 35,
                          height: 35,
                          fontSize: "1rem",
                          margin: "0 auto",
                        }}
                      >
                        {index + 1}
                      </Avatar>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#2C3E50", fontSize: "1.1rem" }}>
                      {school.escola_nome}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: getPositionColor(index + 1),
                          fontWeight: "bold",
                          fontSize: "1.3rem",
                        }}
                      >
                        {school.pontos.toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* Componente com Quantidades das 5 Escolas que Precisam Crescer - AZUL */}
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
            <TrendingUp sx={{ color: "#2196F3", fontSize: 32, mr: 2 }} />
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: "#4CAF50",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              5 ESCOLAS COM OPORTUNIDADES DE CRESCIMENTO
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
                      textAlign: "center",
                    }}
                  >
                    Posição
                  </TableCell>
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
                      textAlign: "center",
                    }}
                  >
                    Pontos Atuais
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bottomSchools.map((school, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": {
                        bgcolor: "#2196F310",
                      },
                      "&:hover": {
                        bgcolor: "#2196F320",
                        transform: "scale(1.01)",
                        transition: "all 0.2s ease-in-out",
                      },
                    }}
                  >
                    <TableCell sx={{ textAlign: "center" }}>
                      <Avatar
                        sx={{
                          bgcolor: "#2196F3",
                          color: "white",
                          fontWeight: "bold",
                          width: 35,
                          height: 35,
                          fontSize: "1rem",
                          margin: "0 auto",
                        }}
                      >
                        {index + 1}
                      </Avatar>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#2C3E50", fontSize: "1.1rem" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <School sx={{ color: "#2196F3", fontSize: 20 }} />
                        {school.escola_nome}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#2196F3",
                          fontWeight: "bold",
                          fontSize: "1.3rem",
                        }}
                      >
                        {school.pontos.toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* Tabela de Novos Cadastros com Paginação - AMARELO */}
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
                color: "#4CAF50",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              NOVOS CADASTROS DE FORMULÁRIOS
            </Typography>
          </Box>
          {/* Input de busca para Novos Cadastros */}
          <Autocomplete
            freeSolo
            options={allSchools.map((school) => school.nomeEscola)}
            onInputChange={(event, newInputValue) => {
              setAllSchoolsSearchTerm(newInputValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar escola nos cadastros"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px", // Mais arredondado
                    "& fieldset": {
                      borderColor: "#E0E0E0", // Borda mais clara
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    },
                    "&:hover fieldset": {
                      borderColor: "#A5D6A7", // Verde suave no hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#81C784", // Verde um pouco mais forte no focus
                      boxShadow: "0 2px 8px rgba(76, 175, 80, 0.1)", // Sombra sutil no focus
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#757575", // Cor do label mais suave
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#4CAF50", // Verde no label focado
                  },
                }}
              />
            )}
            sx={{ mb: 3 }}
          />
          <TableContainer
            sx={{
              borderRadius: 2,
              border: "1px solid #E0E0E0",
              maxHeight: 600,
              mb: 3,
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
                {filteredAllSchoolsPaginated.map((school, index) => {
                  // Mapear dados para o formato da tabela antiga
                  const materiais = []
                  if (school.totalPlastico > 0) materiais.push("Plástico")
                  if (school.totalPapel > 0) materiais.push("Papel")
                  if (school.totalAluminio > 0) materiais.push("Alumínio")
                  if (school.totalEletronico > 0) materiais.push("Eletrônico")
                  // Determinar volume baseado nos totais
                  let volume = "Bag Vazio"
                  if (school.totalCheio > 0) volume = "Bag Cheio"
                  else if (school.totalSemiCheio > 0) volume = "Bag Semi Cheio"
                  // Formatar data se disponível
                  let dataFormatada = "28/01/2025"
                  if (school.dataMaisRecente) {
                    const data = new Date(school.dataMaisRecente)
                    dataFormatada = data.toLocaleDateString("pt-BR")
                  }
                  return (
                    <TableRow
                      key={index}
                      onClick={() => handleOpenModal(school, "allSchools")}
                      sx={{
                        "&:nth-of-type(odd)": {
                          bgcolor: "#2196F310",
                        },
                        "&:hover": {
                          bgcolor: "#2196F320",
                          transform: "scale(1.01)",
                          transition: "all 0.2s ease-in-out",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500, color: "#2C3E50" }}>{school.nomeEscola}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CalendarToday sx={{ color: "#666", fontSize: 16 }} />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {dataFormatada}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                          {school.totalPlastico > 0 && (
                            <Chip
                              label={`Plástico: ${school.totalPlastico}`}
                              size="small"
                              sx={{
                                bgcolor: "#4CAF5015",
                                color: "#4CAF50",
                                fontSize: "0.75rem",
                              }}
                            />
                          )}
                          {school.totalPapel > 0 && (
                            <Chip
                              label={`Papel: ${school.totalPapel}`}
                              size="small"
                              sx={{
                                bgcolor: "#2196F315",
                                color: "#2196F3",
                                fontSize: "0.75rem",
                              }}
                            />
                          )}
                          {school.totalAluminio > 0 && (
                            <Chip
                              label={`Alumínio: ${school.totalAluminio}`}
                              size="small"
                              sx={{
                                bgcolor: "#FF980015",
                                color: "#FF9800",
                                fontSize: "0.75rem",
                              }}
                            />
                          )}
                          {school.totalEletronico > 0 && (
                            <Chip
                              label={`Eletrônico: ${school.totalEletronico}`}
                              size="small"
                              sx={{
                                bgcolor: "#9C27B015",
                                color: "#9C27B0",
                                fontSize: "0.75rem",
                              }}
                            />
                          )}
                          {school.totalPlastico === 0 &&
                            school.totalPapel === 0 &&
                            school.totalAluminio === 0 &&
                            school.totalEletronico === 0 && (
                              <Chip
                                label="Sem materiais"
                                size="small"
                                sx={{
                                  bgcolor: "#9E9E9E15",
                                  color: "#9E9E9E",
                                  fontSize: "0.75rem",
                                }}
                              />
                            )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={volume}
                          sx={{
                            bgcolor: `${getVolumeColor(volume)}15`,
                            color: getVolumeColor(volume),
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Paginação */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontSize: "1rem",
                    fontWeight: "bold",
                  },
                  "& .Mui-selected": {
                    bgcolor: "#4CAF50 !important",
                    color: "white",
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                Página {currentPage} de {totalPages} - Mostrando {filteredAllSchoolsPaginated.length} escolas
              </Typography>
            </Stack>
          </Box>
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
            Parceria Consórcio Limpa Gyn e Prefeitura de Goiânia
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

      {/* Modal de Visualização */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflowY: "auto",
            p: 4,
            borderRadius: 3,
            boxShadow: "0 12px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography id="modal-title" variant="h5" component="h2" sx={{ color: "#2C3E50", fontWeight: 600 }}>
              Detalhes da {modalType === "topSchools" ? "Escola" : "Coleta"}
            </Typography>
            <Button onClick={handleCloseModal} sx={{ minWidth: 0, p: 0.5, color: "#777" }}>
              <CloseIcon />
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {selectedItem && modalType === "topSchools" && (
            <Grid container spacing={2} id="modal-description">
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <School sx={{ color: "#4CAF50", fontSize: 24 }} />
                  <Typography variant="body1" sx={{ fontWeight: 500, color: "#333" }}>
                    Nome da Escola:
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    {selectedItem.escola_nome}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <StarIcon sx={{ color: "#FFD700", fontSize: 24 }} />
                  <Typography variant="body1" sx={{ fontWeight: 500, color: "#333" }}>
                    Pontos:
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: "bold" }}>
                    {selectedItem.pontos.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          {selectedItem && modalType === "allSchools" && (
            <Grid container spacing={2} id="modal-description">
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <School sx={{ color: "#4CAF50", fontSize: 24 }} />
                  <Typography variant="body1" sx={{ fontWeight: 500, color: "#333" }}>
                    Nome da Escola:
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    {selectedItem.nomeEscola}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DateRangeIcon sx={{ color: "#666", fontSize: 24 }} />
                  <Typography variant="body1" sx={{ fontWeight: 500, color: "#333" }}>
                    Data da Coleta:
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    {selectedItem.dataMaisRecente
                      ? new Date(selectedItem.dataMaisRecente).toLocaleDateString("pt-BR")
                      : "N/A"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <CategoryIcon sx={{ color: "#777", fontSize: 24 }} />
                  <Typography variant="body1" sx={{ fontWeight: 500, color: "#333" }}>
                    Materiais Coletados:
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", pl: 4 }}>
                  {selectedItem.totalPlastico > 0 && (
                    <Chip
                      icon={<RecyclingOutlined />}
                      label={`Plástico: ${selectedItem.totalPlastico}`}
                      sx={{ bgcolor: "#4CAF5015", color: "#4CAF50", fontSize: "0.85rem", fontWeight: 500 }}
                    />
                  )}
                  {selectedItem.totalPapel > 0 && (
                    <Chip
                      icon={<DescriptionOutlined />}
                      label={`Papel: ${selectedItem.totalPapel}`}
                      sx={{ bgcolor: "#2196F315", color: "#2196F3", fontSize: "0.85rem", fontWeight: 500 }}
                    />
                  )}
                  {selectedItem.totalAluminio > 0 && (
                    <Chip
                      icon={<BatteryChargingFullOutlined />}
                      label={`Alumínio: ${selectedItem.totalAluminio}`}
                      sx={{ bgcolor: "#FF980015", color: "#FF9800", fontSize: "0.85rem", fontWeight: 500 }}
                    />
                  )}
                  {selectedItem.totalEletronico > 0 && (
                    <Chip
                      icon={<PhoneAndroidOutlined />}
                      label={`Eletrônico: ${selectedItem.totalEletronico}`}
                      sx={{ bgcolor: "#9C27B015", color: "#9C27B0", fontSize: "0.85rem", fontWeight: 500 }}
                    />
                  )}
                  {selectedItem.totalPlastico === 0 &&
                    selectedItem.totalPapel === 0 &&
                    selectedItem.totalAluminio === 0 &&
                    selectedItem.totalEletronico === 0 && (
                      <Chip
                        label="Sem materiais"
                        sx={{ bgcolor: "#9E9E9E15", color: "#9E9E9E", fontSize: "0.85rem", fontWeight: 500 }}
                      />
                    )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <StorageIcon sx={{ color: "#777", fontSize: 24 }} />
                  <Typography variant="body1" sx={{ fontWeight: 500, color: "#333" }}>
                    Volume do Bag:
                  </Typography>
                  <Chip
                    label={
                      selectedItem.totalCheio > 0
                        ? "Bag Cheio"
                        : selectedItem.totalSemiCheio > 0
                          ? "Bag Semi Cheio"
                          : "Bag Vazio"
                    }
                    sx={{
                      bgcolor: `${getVolumeColor(
                        selectedItem.totalCheio > 0
                          ? "Bag Cheio"
                          : selectedItem.totalSemiCheio > 0
                            ? "Bag Semi Cheio"
                            : "Bag Vazio",
                      )}15`,
                      color: getVolumeColor(
                        selectedItem.totalCheio > 0
                          ? "Bag Cheio"
                          : selectedItem.totalSemiCheio > 0
                            ? "Bag Semi Cheio"
                            : "Bag Vazio",
                      ),
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              startIcon={<CloseIcon />}
              sx={{
                bgcolor: "#4CAF50",
                "&:hover": { bgcolor: "#388E3C" },
                borderRadius: "8px",
                px: 3,
                py: 1.2,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Fechar
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  )
}
