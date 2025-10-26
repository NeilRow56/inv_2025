import CheckBoxAndOthers from '@/components/form/form-rhf-checkbox-example'
import { FormRhfSelect } from '@/components/form/form-rhf-select-example'
import { SignOutButton } from './auth/_components/sign-out-button'

export default function Home() {
  return (
    <div className='container mx-auto flex h-dvh flex-col items-center justify-center space-y-12'>
      <FormRhfSelect />
      <SignOutButton />
      <CheckBoxAndOthers />
    </div>
  )
}
