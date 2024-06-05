import { useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Box } from '@fower/react'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { log } from 'mathjs'
import { Button, Input } from 'uikit'
import { ClientOnly } from '@penx/widget'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

function price(x: number) {
  return 0.2 * log(0.01 * x + 1) + 0.1
}

function PageCurve() {
  const ref = useRef<HTMLInputElement>()
  const [value, setValue] = useState(1000)
  const arr = Array(value)
    .fill('')
    .map((_, i) => i + 1)

  const prices = arr.map((x) => price(x))

  const values = prices.reduce((acc, cur) => acc + cur, 0)

  console.log('=======prices:', prices)
  console.log('======values:', values)

  const data = {
    labels: arr.map((x) => x.toString()),
    datasets: [
      {
        label: 'Dataset 2',
        data: arr.map((x) => price(x)),
        borderColor: 'rgb(53, 162, 235)',
      },
    ],
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  }
  return (
    <ClientOnly>
      <Box h-100vh column toCenter p20>
        <Box toCenterY gap1>
          <Input ref={ref as any} defaultValue={value} />
          <Button
            onClick={() => {
              console.log('======ref.current?.value:', ref.current?.value)
              setValue(Number(ref.current?.value))
            }}
          >
            Confirm
          </Button>
        </Box>
        <Line options={options} data={data} />
      </Box>
    </ClientOnly>
  )
}

export default PageCurve
