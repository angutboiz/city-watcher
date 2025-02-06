import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalSearchParams, useRouter } from 'expo-router'

const useTheme = () => {
    const router = useRouter()

    const { colorScheme: globalColorScheme } = useGlobalSearchParams()

    const [localColorScheme, setLocalColorScheme] = React.useState(
        globalColorScheme || 'light'
    )

    React.useEffect(() => {
        if (globalColorScheme) {
            setLocalColorScheme(globalColorScheme)
        }
    }, [globalColorScheme])

    const toggleTheme = () => {
        const newColorScheme = localColorScheme === 'light' ? 'dark' : 'light'
        setLocalColorScheme(newColorScheme)
        router.setParams({ colorScheme: newColorScheme })
    }
    return { toggleTheme, colorScheme: localColorScheme }
}

export default useTheme
