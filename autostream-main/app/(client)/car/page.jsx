import { CarDisplay } from '@/app/_components/car-display'
import { CreateUser } from '@/lib/db/create-user'
import React from 'react'

async function CarPage() {
  await CreateUser()
  return (
    <div>
        <CarDisplay/>
    </div>
  )
}

export default CarPage