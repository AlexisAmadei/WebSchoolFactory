import { Flex, Text } from '@radix-ui/themes'
import { Link } from 'react-router'

export default function Navbar() {
    return (
        <Flex as="nav" justify="center" align="center" gap="6" mb="4">
            <Link to={"/"}>
                <Text size="3" weight="bold">Home</Text>
            </Link>
            <Link to={"/teams"}>
                <Text size="3" weight="bold">Teams</Text>
            </Link>
        </Flex>
    )
}
