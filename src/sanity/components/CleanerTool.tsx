import { Card, Button, Stack, Text, Heading, ToastProvider, useToast, Container, Flex } from '@sanity/ui'
import { useState, useEffect, useCallback } from 'react'
import { useClient } from 'sanity'
import { TrashIcon, WarningOutlineIcon, RefreshIcon } from '@sanity/icons'

// Versi API untuk client
const API_VERSION = '2024-01-01'

export default function CleanerTool() {
  const client = useClient({ apiVersion: API_VERSION })
  const toast = useToast()
  
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState<number | null>(null)

  // Fetch jumlah pesan saat ini
  const fetchCount = useCallback(async () => {
    try {
      const result = await client.fetch(`count(*[_type == "contact"])`)
      setCount(result)
    } catch (err) {
      console.error(err)
      toast.push({ status: 'error', title: 'Gagal memuat data' })
    }
  }, [client, toast])

  useEffect(() => {
    fetchCount()
  }, [fetchCount])

  // Fungsi Hapus Semua
  const handleDeleteAll = async () => {
    if (!confirm('YAKIN MAU HAPUS SEMUA PESAN?\n\nTindakan ini tidak bisa dibatalkan!')) return

    setLoading(true)
    try {
      // 1. Ambil semua ID
      const ids = await client.fetch(`*[_type == "contact"]._id`)
      
      if (ids.length === 0) {
        toast.push({ status: 'info', title: 'Tidak ada pesan untuk dihapus' })
        setLoading(false)
        return
      }

      // 2. Hapus pakai transaction
      const transaction = client.transaction()
      ids.forEach((id: string) => transaction.delete(id))
      await transaction.commit()

      toast.push({ status: 'success', title: `Berhasil menghapus ${ids.length} pesan!` })
      setCount(0)
    } catch (err) {
      console.error(err)
      toast.push({ status: 'error', title: 'Gagal menghapus pesan' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToastProvider>
      <Container width={1} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card padding={5} radius={3} shadow={2} border>
          <Stack space={5} padding={4}>
            
            <Stack space={3} style={{ textAlign: 'center' }}>
              <Heading as="h1" size={3}>🧹 Contact Cleaner</Heading>
              <Text size={2} muted>Hapus semua pesan testing dengan satu klik.</Text>
            </Stack>

            <Card padding={4} radius={2} tone="transparent" border style={{ textAlign: 'center' }}>
              <Stack space={3}>
                <Text size={1} weight="semibold" style={{ textTransform: 'uppercase' }}>Total Pesan Tersimpan</Text>
                <Heading size={4}>{count !== null ? count : '...'}</Heading>
              </Stack>
            </Card>

            <Stack space={3}>
              <Button
                icon={TrashIcon}
                tone="critical"
                mode="ghost"
                text={loading ? 'Menghapus...' : 'Hapus Semua Pesan'}
                onClick={handleDeleteAll}
                disabled={loading || count === 0}
                fontSize={3}
                padding={4}
                style={{ cursor: 'pointer' }}
              />
              
              <Button
                icon={RefreshIcon}
                mode="bleed"
                text="Refresh Data"
                onClick={fetchCount}
                disabled={loading}
                fontSize={2}
              />
            </Stack>

            {count !== null && count > 0 && (
              <Card padding={3} radius={2} tone="caution" border>
                <Flex direction="row" align="center" gap={3}>
                  <Text size={1}>
                    <WarningOutlineIcon />
                  </Text>
                  <Text size={1} weight="medium">
                    Perhatian: Data yang dihapus tidak dapat dikembalikan.
                  </Text>
                </Flex>
              </Card>
            )}

          </Stack>
        </Card>
      </Container>
    </ToastProvider>
  )
}
