import axios from "axios"

const BASE_URL = "http://127.0.0.1:8000/"

export const listarTotaisPorEscolaPaginado = async (page = 1, pageSize = 1777) => {
  console.log("🔄 [API] Iniciando listarTotaisPorEscolaPaginado")
  console.log("📝 [API] Parâmetros recebidos:", { page, pageSize })
  console.log("🔍 [API] Tipo do page:", typeof page, "Valor:", page)
  console.log("🔍 [API] Tipo do pageSize:", typeof pageSize, "Valor:", pageSize)

  if (typeof page !== "number" || page < 1) {
    console.log("❌ [API] Erro de validação - page inválido:", page)
    return { erro: "Parâmetro 'page' deve ser número inteiro maior ou igual a 1." }
  }
  if (typeof pageSize !== "number" || pageSize < 1) {
    console.log("❌ [API] Erro de validação - pageSize inválido:", pageSize)
    return { erro: "Parâmetro 'pageSize' deve ser número inteiro maior ou igual a 1." }
  }

  console.log("✅ [API] Validação dos parâmetros passou")

  try {
    const url = `${BASE_URL}api/form/lista_completa/`
    const params = { page, page_size: pageSize }

    console.log("📡 [API] URL da requisição:", url)
    console.log("📡 [API] Parâmetros da requisição:", params)
    console.log("📡 [API] Fazendo requisição...")

    const response = await axios.get(url, { params })

    console.log("✅ [API] Requisição concluída!")
    console.log("📊 [API] Status da resposta:", response.status)
    console.log("📊 [API] Headers da resposta:", response.headers)
    console.log("📊 [API] Dados completos da resposta:", response.data)
    console.log("🔍 [API] Tipo da resposta:", typeof response.data)
    console.log("🔍 [API] É array?", Array.isArray(response.data))

    const resultado = response.data
    console.log("🔄 [API] Resultado extraído:", resultado)
    console.log("🔍 [API] Propriedades do resultado:", Object.keys(resultado))

    // Verificar se tem as propriedades esperadas
    console.log("🔍 [API] total_escolas:", resultado.total_escolas)
    console.log("🔍 [API] page:", resultado.page)
    console.log("🔍 [API] page_size:", resultado.page_size)
    console.log("🔍 [API] results:", resultado.results)
    console.log("🔍 [API] Tipo de results:", typeof resultado.results)
    console.log("🔍 [API] Results é array?", Array.isArray(resultado.results))
    console.log("🔍 [API] Quantidade de results:", resultado.results?.length)

    const dadosMapeados = {
      sucesso: true,
      totalEscolas: resultado.total_escolas ?? 0,
      paginaAtual: resultado.page ?? page,
      tamanhoPagina: resultado.page_size ?? pageSize,
      resultados: (resultado.results ?? []).map((item, index) => {
        console.log(`🔄 [API] Mapeando item ${index + 1}:`, item)
        console.log(`🔍 [API] Propriedades do item ${index + 1}:`, Object.keys(item))

        const mapped = {
          nomeEscola: item.escola__nome_escola ?? "",
          totalPlastico: item.bag_plastico_total ?? 0,
          totalPapel: item.bag_papel_total ?? 0,
          totalAluminio: item.bag_aluminio_total ?? 0,
          totalEletronico: item.bag_eletronico_total ?? 0,
          totalVazio: item.bag_vazio_total ?? 0,
          totalSemiCheio: item.bag_semi_cheio_total ?? 0,
          totalCheio: item.bag_cheio_total ?? 0,
          pontosTotal: item.pontos_total ?? 0,
          dataMaisRecente: item.data_mais_recente ?? null,
        }

        console.log(`✅ [API] Item ${index + 1} mapeado:`, mapped)
        return mapped
      }),
    }

    console.log("🎉 [API] Dados finais mapeados - listarTotaisPorEscolaPaginado:", dadosMapeados)
    console.log("📊 [API] Total de escolas encontradas:", dadosMapeados.resultados.length)

    return dadosMapeados
  } catch (error) {
    console.error("💥 [API] Erro capturado em listarTotaisPorEscolaPaginado:")
    console.error("💥 [API] Tipo do erro:", typeof error)
    console.error("💥 [API] Erro completo:", error)
    console.error("💥 [API] Message:", error.message)
    console.error("💥 [API] Stack:", error.stack)

    if (error.response) {
      console.error("💥 [API] Response status:", error.response.status)
      console.error("💥 [API] Response data:", error.response.data)
      console.error("💥 [API] Response headers:", error.response.headers)
    }

    if (error.request) {
      console.error("💥 [API] Request:", error.request)
    }

    return { erro: `Erro ao enviar requisição: ${error.message}` }
  }
}

export const top10EscolasMaisPontos = async () => {
  console.log("🔄 [API] Iniciando top10EscolasMaisPontos")

  try {
    console.log("📡 [API] Fazendo requisição para:", `${BASE_URL}api/form/top_10/`)
    const response = await axios.get(`${BASE_URL}api/form/top_10/`)

    console.log("✅ [API] Resposta recebida - top10EscolasMaisPontos:", response.data)

    const data = response.data
    const lista = Array.isArray(data.top_10_escolas) ? data.top_10_escolas : []

    console.log("🔍 [API] Lista extraída de top_10_escolas:", lista)
    console.log("📊 [API] Quantidade de escolas no top 10:", lista.length)

    if (lista.length === 0) {
      console.log("⚠️ [API] Nenhum dado encontrado em top_10_escolas")
      return { erro: "Nenhum dado encontrado em 'top_10_escolas'." }
    }

    const resultadosMapeados = lista.map((item, index) => {
      console.log(`🔄 [API] Mapeando escola ${index + 1}:`, item)
      return {
        escolaNome: typeof item.escola_nome === "string" ? item.escola_nome : "",
        pontos: typeof item.pontos === "number" ? item.pontos : 0,
      }
    })

    console.log("✅ [API] Dados finais mapeados - top10EscolasMaisPontos:", resultadosMapeados)

    return {
      sucesso: true,
      resultados: resultadosMapeados,
    }
  } catch (error) {
    console.error("❌ [API] Erro em top10EscolasMaisPontos:", error)
    console.error("❌ [API] Detalhes do erro:", error.message)
    return { erro: `Erro ao enviar requisição: ${error.message}` }
  }
}

export const bottom5EscolasMenosPontos = async () => {
  console.log("🔄 [API] Iniciando bottom5EscolasMenosPontos")

  try {
    console.log("📡 [API] Fazendo requisição para:", `${BASE_URL}api/form/bottom_5/`)
    const response = await axios.get(`${BASE_URL}api/form/bottom_5/`)

    console.log("✅ [API] Resposta recebida - bottom5EscolasMenosPontos:", response.data)

    const data = response.data
    const lista = Array.isArray(data.bottom_5_escolas) ? data.bottom_5_escolas : []

    console.log("🔍 [API] Lista extraída de bottom_5_escolas:", lista)
    console.log("📊 [API] Quantidade de escolas no bottom 5:", lista.length)

    if (lista.length === 0) {
      console.log("⚠️ [API] Nenhum dado encontrado em bottom_5_escolas")
      return { erro: "Nenhum dado encontrado em 'bottom_5_escolas'." }
    }

    const resultadosMapeados = lista.map((item, index) => {
      console.log(`🔄 [API] Mapeando escola ${index + 1}:`, item)
      return {
        escolaNome: typeof item.escola_nome === "string" ? item.escola_nome : "",
        pontos: typeof item.pontos === "number" ? item.pontos : 0,
      }
    })

    console.log("✅ [API] Dados finais mapeados - bottom5EscolasMenosPontos:", resultadosMapeados)

    return {
      sucesso: true,
      resultados: resultadosMapeados,
    }
  } catch (error) {
    console.error("❌ [API] Erro em bottom5EscolasMenosPontos:", error)
    console.error("❌ [API] Detalhes do erro:", error.message)
    return { erro: `Erro ao enviar requisição: ${error.message}` }
  }
}
