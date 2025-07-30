"use client"

import { useState, useEffect } from "react"
import dayjs from "dayjs"
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import Image from "next/image"
import { criarEscola, criarColeta } from "@/service/formulario_escola"
import { CheckCircle, Error, Warning, Close } from "@mui/icons-material"

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

  // Renderiza um placeholder durante a hidratação
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

export default function ColetaForm() {
  const [schoolName, setSchoolName] = useState("")
  const [formData, setFormData] = useState({
    truckPrefix: "",
    collectionDate: null,
    neighborhood: "",
    driverName: "",
    driverId: "",
    collectorName: "",
    collectorId: "",
    school: "",
    arrivalTime: null,
    departureTime: null,
    materials: {
      plasticBag: false,
      paperBag: false,
      aluminumBag: false,
      electronicBag: false,
    },
    volumeEvaluation: "",
    responsibleName: "",
    responsiblePhone: "",
    responsibleCpf: "",
  })

  // Estados para feedback
  const [loading, setLoading] = useState(false)
  const [schoolLoading, setSchoolLoading] = useState(false)
  const [modal, setModal] = useState({
    open: false,
    message: "",
    type: "success", // success, error, warning
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, collectionDate: date }))
  }

  const handleTimeChange = (time, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: time }))
  }

  const handleMaterialChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      materials: {
        ...prev.materials,
        [name]: checked,
      },
    }))
  }

  const handleVolumeChange = (e) => {
    setFormData((prev) => ({ ...prev, volumeEvaluation: e.target.value }))
  }

  const showModal = (message, type = "success") => {
    setModal({
      open: true,
      message,
      type,
    })
  }

  const handleCloseModal = () => {
    setModal((prev) => ({ ...prev, open: false }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Preparar dados para a API seguindo exatamente o mapeamento
      const coletaData = {
        prefixo_caminhao: formData.truckPrefix,
        data: formData.collectionDate ? formData.collectionDate.format("YYYY-MM-DD") : "",
        bairro: formData.neighborhood,
        motorista_nome: formData.driverName,
        motorista_matricula: formData.driverId,
        coletor_nome: formData.collectorName,
        coletor_matricula: formData.collectorId,
        escola: formData.school,
        horario_chegada: formData.arrivalTime ? formData.arrivalTime.format("HH:mm") : "",
        horario_saida: formData.departureTime ? formData.departureTime.format("HH:mm") : "",
        bag_plastico: formData.materials.plasticBag ? 1 : 0,
        bag_papel: formData.materials.paperBag ? 1 : 0,
        bag_aluminio: formData.materials.aluminumBag ? 1 : 0,
        bag_eletronico: formData.materials.electronicBag ? 1 : 0,
        bag_vazio: formData.volumeEvaluation === "empty" ? 1 : 0,
        bag_semi_cheio: formData.volumeEvaluation === "semi-full" ? 1 : 0,
        bag_cheio: formData.volumeEvaluation === "full" ? 1 : 0,
        assinatura_responsavel: formData.responsibleName,
        telefone_responsavel: formData.responsiblePhone,
        cpf_responsavel: formData.responsibleCpf,
      }

      console.log("Dados enviados para API:", coletaData)

      const resultado = await criarColeta(coletaData)

      if (resultado.sucesso) {
        showModal("Coleta cadastrada com sucesso!", "success")
        // Limpar formulário após sucesso
        setFormData({
          truckPrefix: "",
          collectionDate: null,
          neighborhood: "",
          driverName: "",
          driverId: "",
          collectorName: "",
          collectorId: "",
          school: "",
          arrivalTime: null,
          departureTime: null,
          materials: {
            plasticBag: false,
            paperBag: false,
            aluminumBag: false,
            electronicBag: false,
          },
          volumeEvaluation: "",
          responsibleName: "",
          responsiblePhone: "",
          responsibleCpf: "",
        })
      } else {
        console.error("Erro da API:", resultado.erro)
        const errorMessage = typeof resultado.erro === "string" ? resultado.erro : JSON.stringify(resultado.erro)
        showModal(`Erro ao cadastrar coleta: ${errorMessage}`, "error")
      }
    } catch (error) {
      console.error("Erro inesperado:", error)
      showModal("Erro inesperado ao enviar formulário", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSchool = async () => {
    if (!schoolName.trim()) {
      showModal("Por favor, digite o nome da escola.", "warning")
      return
    }

    setSchoolLoading(true)

    try {
      const resultado = await criarEscola({ nome_escola: schoolName.trim() })

      if (resultado.sucesso) {
        showModal(`Escola "${schoolName}" cadastrada com sucesso!`, "success")
        setSchoolName("")
      } else {
        console.error("Erro da API:", resultado.erro)
        const errorMessage = typeof resultado.erro === "string" ? resultado.erro : JSON.stringify(resultado.erro)
        showModal(`Erro ao cadastrar escola: ${errorMessage}`, "error")
      }
    } catch (error) {
      console.error("Erro inesperado:", error)
      showModal("Erro inesperado ao cadastrar escola", "error")
    } finally {
      setSchoolLoading(false)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          position: "relative", // Necessário para posicionar o background absoluto
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          // A imagem de fundo e o blur serão aplicados em um Box separado
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
            backgroundImage: `url('/criancada.jpg')`, // Nome da imagem de fundo corrigido
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            filter: "blur(5px)", // Aplica o desfoque APENAS nesta camada
            WebkitFilter: "blur(7px)",
            zIndex: -1, // Garante que fique atrás do conteúdo
          }}
        />

        {/* Header */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: "linear-gradient(to right, #F8F9FA, #E9ECEF, #F8F9FA)", // Gradiente mais suave e claro
            boxShadow: "0 8px 30px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05), inset 0 -1px 0 rgba(0,0,0,0.03)", // Sombra mais sutil
            borderBottom: "1px solid #DEE2E6", // Borda mais suave
            backdropFilter: "blur(8px)", // Desfoque um pouco menos intenso
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
                width={160} // Aumentado de 100 para 120
                height={120} // Aumentado de 100 para 120
                style={{ objectFit: "contain" }}
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.08) rotate(5deg)",
                  },
                }}
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
                  Cadastro de Coletas e Escola
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
                  Coleta de Materiais Recicláveis nas Escolas
                </Typography>
              </Box>
            </Box>
            <LiveClock /> {/* Relógio aprimorado */}
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, pb: 8 }}>
          {/* School Registration Section */}
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
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                color: "#388E3C",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
                borderBottom: "2px solid #EEEEEE",
                pb: 1,
                mb: 3,
                textAlign: "center",
              }}
            >
              CADASTRAR ESCOLA
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end", flexWrap: "wrap" }}>
              <TextField
                fullWidth
                label="Nome da Escola"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                variant="outlined"
                size="medium"
                disabled={schoolLoading}
                sx={{
                  flex: 1,
                  minWidth: "300px",
                  "& .MuiOutlinedInput-root": { borderRadius: 1.5 },
                }}
              />
              <Button
                variant="outlined"
                onClick={handleSaveSchool}
                disabled={schoolLoading}
                sx={{
                  borderColor: "#4CAF50",
                  color: "#4CAF50",
                  "&:hover": {
                    borderColor: "#388E3C",
                    color: "#388E3C",
                    backgroundColor: "rgba(76, 175, 80, 0.04)",
                    transform: "translateY(-1px)",
                  },
                  "&:disabled": {
                    borderColor: "#ccc",
                    color: "#ccc",
                  },
                  py: 1.5,
                  px: 4,
                  fontSize: "1rem",
                  borderRadius: 1.5,
                  transition: "all 0.3s ease-in-out",
                  minWidth: "120px",
                }}
              >
                {schoolLoading ? "Salvando..." : "Salvar"}
              </Button>
            </Box>
          </Paper>

          {/* Form Section */}
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
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                color: "#388E3C",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
                borderBottom: "2px solid #EEEEEE",
                pb: 1,
                mb: 3,
                textAlign: "center",
              }}
            >
              FORMULÁRIO DE COLETA
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Row 1 */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Prefixo do Caminhão"
                    name="truckPrefix"
                    value={formData.truckPrefix}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    disabled={loading}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Data da Coleta"
                    value={formData.collectionDate}
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    disabled={loading}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "medium",
                        sx: { "& .MuiOutlinedInput-root": { borderRadius: 1.5 } },
                      },
                    }}
                  />
                </Grid>

                {/* Row 2 */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Bairro"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    disabled={loading}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Escola"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    disabled={loading}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                  />
                </Grid>

                {/* Driver Info */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "#558B2F",
                      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 500,
                      borderBottom: "1px dashed #DDDDDD",
                      pb: 1,
                      letterSpacing: "0.01em",
                    }}
                  >
                    Dados do Motorista
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Nome do Motorista"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    disabled={loading}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Matrícula do Motorista"
                    name="driverId"
                    value={formData.driverId}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    disabled={loading}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                  />
                </Grid>

                {/* Collector Info */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "#558B2F",
                      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 500,
                      borderBottom: "1px dashed #DDDDDD",
                      pb: 1,
                      letterSpacing: "0.01em",
                    }}
                  >
                    Dados do Coletor
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Nome do Coletor"
                    name="collectorName"
                    value={formData.collectorName}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    disabled={loading}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Matrícula do Coletor"
                    name="collectorId"
                    value={formData.collectorId}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    disabled={loading}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                  />
                </Grid>

                {/* Time Info */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "#558B2F",
                      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 500,
                      borderBottom: "1px dashed #DDDDDD",
                      pb: 1,
                      letterSpacing: "0.01em",
                    }}
                  >
                    Horários de Coleta
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                  <TimePicker
                    label="Horário de Chegada"
                    value={formData.arrivalTime}
                    onChange={(time) => handleTimeChange(time, "arrivalTime")}
                    format="HH:mm"
                    disabled={loading}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "medium",
                        sx: { "& .MuiOutlinedInput-root": { borderRadius: 1.5 } },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                  <TimePicker
                    label="Horário de Saída"
                    value={formData.departureTime}
                    onChange={(time) => handleTimeChange(time, "departureTime")}
                    format="HH:mm"
                    disabled={loading}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "medium",
                        sx: { "& .MuiOutlinedInput-root": { borderRadius: 1.5 } },
                      },
                    }}
                  />
                </Grid>

                {/* Material Coletado */}
                <Grid item xs={12}>
                  <FormControl component="fieldset" variant="standard" sx={{ mt: 2 }}>
                    <FormLabel
                      component="legend"
                      sx={{
                        color: "#558B2F",
                        fontSize: "1.25rem",
                        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 500,
                        mb: 1,
                        letterSpacing: "0.01em",
                      }}
                    >
                      Tipos de Material Coletado
                    </FormLabel>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 1, sm: 3 }, mt: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.materials.plasticBag}
                            onChange={handleMaterialChange}
                            name="plasticBag"
                            disabled={loading}
                            sx={{ color: "#4CAF50", "&.Mui-checked": { color: "#4CAF50" } }}
                          />
                        }
                        label={
                          <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, color: "#444" }}>
                            Bag de Plástico
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.materials.paperBag}
                            onChange={handleMaterialChange}
                            name="paperBag"
                            disabled={loading}
                            sx={{ color: "#4CAF50", "&.Mui-checked": { color: "#4CAF50" } }}
                          />
                        }
                        label={
                          <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, color: "#444" }}>
                            Bag de Papel
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.materials.aluminumBag}
                            onChange={handleMaterialChange}
                            name="aluminumBag"
                            disabled={loading}
                            sx={{ color: "#4CAF50", "&.Mui-checked": { color: "#4CAF50" } }}
                          />
                        }
                        label={
                          <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, color: "#444" }}>
                            Bag de Alumínio
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.materials.electronicBag}
                            onChange={handleMaterialChange}
                            name="electronicBag"
                            disabled={loading}
                            sx={{ color: "#4CAF50", "&.Mui-checked": { color: "#4CAF50" } }}
                          />
                        }
                        label={
                          <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, color: "#444" }}>
                            Bag de Eletrônico
                          </Typography>
                        }
                      />
                    </Box>
                  </FormControl>
                </Grid>

                {/* Avaliação do Volume Coletado */}
                <Grid item xs={12}>
                  <FormControl component="fieldset" sx={{ mt: 2 }}>
                    <FormLabel
                      component="legend"
                      sx={{
                        color: "#558B2F",
                        fontSize: "1.25rem",
                        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontWeight: 500,
                        mb: 1,
                        letterSpacing: "0.01em",
                      }}
                    >
                      Volume do Material Coletado
                    </FormLabel>
                    <RadioGroup
                      row
                      name="volumeEvaluation"
                      value={formData.volumeEvaluation}
                      onChange={handleVolumeChange}
                      sx={{ mt: 1, flexWrap: "wrap", gap: { xs: 1, sm: 3 } }}
                    >
                      <FormControlLabel
                        value="empty"
                        control={
                          <Radio disabled={loading} sx={{ color: "#4CAF50", "&.Mui-checked": { color: "#4CAF50" } }} />
                        }
                        label={
                          <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, color: "#444" }}>
                            Bag Vazio
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="semi-full"
                        control={
                          <Radio disabled={loading} sx={{ color: "#4CAF50", "&.Mui-checked": { color: "#4CAF50" } }} />
                        }
                        label={
                          <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, color: "#444" }}>
                            Bag Semi Cheio
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="full"
                        control={
                          <Radio disabled={loading} sx={{ color: "#4CAF50", "&.Mui-checked": { color: "#4CAF50" } }} />
                        }
                        label={
                          <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, color: "#444" }}>
                            Bag Cheio
                          </Typography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {/* Assinatura do Responsável na Escola */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "#558B2F",
                      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: 500,
                      borderBottom: "1px dashed #DDDDDD",
                      pb: 1,
                      letterSpacing: "0.01em",
                    }}
                  >
                    Dados do Responsável na Escola
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Nome do Responsável"
                    name="responsibleName"
                    value={formData.responsibleName}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    disabled={loading}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Telefone do Responsável"
                    name="responsiblePhone"
                    value={formData.responsiblePhone}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    placeholder="(XX) XXXXX-XXXX"
                    disabled={loading}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="CPF do Responsável"
                    name="responsibleCpf"
                    value={formData.responsibleCpf}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    placeholder="XXX.XXX.XXX-XX"
                    disabled={loading}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 8, mb: 12, display: "flex", justifyContent: "flex-end", pr: 8 }}>
                  <Button
                    type="submit"
                    variant="outlined"
                    disabled={loading}
                    sx={{
                      borderColor: "#4CAF50",
                      color: "#4CAF50",
                      "&:hover": {
                        borderColor: "#388E3C",
                        color: "#388E3C",
                        backgroundColor: "rgba(76, 175, 80, 0.04)",
                        transform: "translateY(-1px)",
                      },
                      "&:disabled": {
                        borderColor: "#ccc",
                        color: "#ccc",
                      },
                      py: 1.5,
                      px: 5,
                      fontSize: "1.1rem",
                      borderRadius: 1.5,
                      transition: "all 0.3s ease-in-out",
                      ml: "auto",
                    }}
                  >
                    {loading ? "Enviando..." : "Enviar Formulário"}
                  </Button>
                </Grid>
              </Grid>
            </form>
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
              <Image
                src="/logolimpa.png"
                alt="Logo Limpa Gyn"
                width={50}
                height={50}
                style={{ objectFit: "contain" }}
              />
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

        {/* Modal para feedback */}
        <Dialog
          open={modal.open}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              overflow: "visible",
            },
          }}
        >
          <DialogContent
            sx={{
              textAlign: "center",
              py: 4,
              px: 3,
              position: "relative",
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "#999",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                },
              }}
            >
              <Close />
            </IconButton>

            <Box sx={{ mb: 2 }}>
              {modal.type === "success" && (
                <CheckCircle
                  sx={{
                    fontSize: 64,
                    color: "#4CAF50",
                    mb: 2,
                    filter: "drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))",
                  }}
                />
              )}
              {modal.type === "error" && (
                <Error
                  sx={{
                    fontSize: 64,
                    color: "#f44336",
                    mb: 2,
                    filter: "drop-shadow(0 4px 8px rgba(244, 67, 54, 0.3))",
                  }}
                />
              )}
              {modal.type === "warning" && (
                <Warning
                  sx={{
                    fontSize: 64,
                    color: "#ff9800",
                    mb: 2,
                    filter: "drop-shadow(0 4px 8px rgba(255, 152, 0, 0.3))",
                  }}
                />
              )}
            </Box>

            <Typography
              variant="h6"
              sx={{
                color: "#333",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 500,
                mb: 1,
                lineHeight: 1.4,
              }}
            >
              {modal.type === "success" && "Sucesso!"}
              {modal.type === "error" && "Erro"}
              {modal.type === "warning" && "Atenção"}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#666",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                lineHeight: 1.5,
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              {modal.message}
            </Typography>
          </DialogContent>

          <DialogActions
            sx={{
              justifyContent: "center",
              pb: 3,
              px: 3,
            }}
          >
            <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{
                backgroundColor: modal.type === "success" ? "#4CAF50" : modal.type === "error" ? "#f44336" : "#ff9800",
                color: "white",
                "&:hover": {
                  backgroundColor:
                    modal.type === "success" ? "#388E3C" : modal.type === "error" ? "#d32f2f" : "#f57c00",
                },
                borderRadius: 2,
                px: 4,
                py: 1,
                fontSize: "1rem",
                fontWeight: 500,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  )
}
