import { Box } from '@fower/react'
import {
  Button,
  Modal,
  ModalClose,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useModalContext,
} from 'uikit'
import { ModalNames } from '@penx/constants'
import { DatabaseProvider, WithStoreDatabase } from '@penx/database-context'
import { RowForm } from '@penx/database-ui'
import { Node } from '@penx/model'
import { INode } from '@penx/model-types'

interface Data {
  cell: INode
  database: Node
}

const Content = () => {
  const {
    data: { cell, database },
  } = useModalContext<Data>()

  return (
    <Box>
      <ModalHeader mb2># {database.tagName}</ModalHeader>
      <WithStoreDatabase databaseId={database.id}>
        {(databaseInfo) => (
          <DatabaseProvider {...databaseInfo}>
            <RowForm rowId={cell.props.rowId} databaseId={database.id} />
          </DatabaseProvider>
        )}
      </WithStoreDatabase>
    </Box>
  )
}

export const RowModal = () => {
  return (
    <Modal name={ModalNames.ROW}>
      <ModalOverlay />
      <ModalContent w={['100%', 500]} column gap4>
        <ModalCloseButton />

        <Content />
      </ModalContent>
    </Modal>
  )
}
