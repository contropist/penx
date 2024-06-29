import { BaseActionProps } from '../../types'
import { ListActionItem } from './ListActionItem'

interface SubmitFormProps extends BaseActionProps {
  onSubmit: (values: any) => Promise<void> | void
}
export function SubmitForm({
  title = 'Open in Browser',
  shortcut,
  icon = { name: 'lucide--globe' },
  onSubmit,
}: SubmitFormProps) {
  return (
    <ListActionItem
      shortcut={shortcut}
      icon={icon}
      onSelect={() => {
        onSubmit({ foo: 'bar' })
      }}
    >
      {title}
    </ListActionItem>
  )
}
