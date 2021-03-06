import { Container, Box, Text, Heading, Button } from 'theme-ui'
import Link from 'next/link'
import Month from '../components/month'
import { SkipBack } from 'react-feather'

export default ({ months }) => (
  <>
    <Box
      as="header"
      sx={{
        bg: 'sheet',
        color: 'primary',
        textAlign: 'center',
        py: [3, 4],
        px: 3,
        mb: [3, 4]
      }}
    >
      <Heading as="h1" variant="title">
        Hack Club Events
      </Heading>
    </Box>
    <Container>
      {Object.keys(months).map((key) => (
        <Month key={key} month={key} events={months[key]} />
      ))}
      <Box as="section" sx={{ textAlign: 'center', pb: [3, 4] }}>
        <Link href="/past" passHref>
          <Button
            as="a"
            variant="outline"
            sx={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <SkipBack />
            View past events
          </Button>
        </Link>
      </Box>
    </Container>
  </>
)

export const getStaticProps = async () => {
  const { getEvents } = require('../lib/data')
  const { groupBy, filter } = require('lodash')
  let events = await getEvents()
  // Filter out events from previous months
  events = filter(
    events,
    (e) =>
      new Date(new Date(e.end.substring(0, 7)).toISOString().substring(0, 7)) >=
      new Date(new Date().toISOString().substring(0, 7))
  )
  const months = groupBy(events, (e) => e.start.substring(0, 7))
  return { props: { months } }
}
