import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'

const Index = ({children}) => {
    return (
        <SimpleGrid minChildWidth='200px' columns={3} spacing={5}>
            {children}
        </SimpleGrid>
    )
}

export default Index
