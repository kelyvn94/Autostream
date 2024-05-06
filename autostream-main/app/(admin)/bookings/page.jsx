import React from 'react'
import { AdminHeader } from '../_comonents/header-admin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookingsTable } from './_components/booking-table'

function BookingsPage() {
  return (
    <div>
      <AdminHeader
      description='Displays all booked cars'
      title='Bookings Page'
      />

      <div>
        <Card className='mt-4 border-none shadow-none'>
          <CardHeader>
            <CardTitle>
              Total Bookings
            </CardTitle>
            <CardDescription>
              Latest Bookings will appear first
            </CardDescription>
          </CardHeader>

          <CardContent>
            <BookingsTable/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BookingsPage