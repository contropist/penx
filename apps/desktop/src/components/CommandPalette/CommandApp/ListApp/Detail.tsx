import { Box } from '@fower/react'
import { DetailItem } from '@penxio/preset-ui'
import { Divider, Spinner } from 'uikit'
import { useDetail } from '~/hooks/useDetail'
import { DataListItem } from '../DataListItem'

interface DetailProps {
  detail: any
}

export function Detail({ detail: detailData }: DetailProps) {
  if (detailData !== 'functionDetail') {
    return <DetailContent detail={detailData} />
  }
  return <DynamicDetail />
}

function DynamicDetail() {
  const { detail } = useDetail()

  if (detail?.isLoading) {
    return (
      <>
        <Divider orientation="vertical" />
        <Box h-100p toCenter flex-3>
          <Spinner></Spinner>
        </Box>
      </>
    )
  }

  return <DetailContent detail={detail.data} />
}

interface DetailContent {
  detail: DetailItem[]
}

function DetailContent({ detail = [] }: DetailContent) {
  return (
    <>
      <Divider orientation="vertical" />
      <Box className="command-app-list-detail" flex-3 overflowAuto p3>
        <Box column gap1>
          {detail.map((item: any) => (
            <DataListItem key={item.label} item={item} />
          ))}
        </Box>
      </Box>
    </>
  )
}
