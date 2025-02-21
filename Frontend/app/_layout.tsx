import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    ThemeProvider,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import merge from 'deepmerge'
import { useColorScheme } from '@/hooks/useColorScheme'
import {
    adaptNavigationTheme,
    MD3DarkTheme,
    MD3LightTheme,
    PaperProvider,
} from 'react-native-paper'
import { Colors } from '../constants/Colors'
import useTheme from '@/hooks/useTheme'
import './global.css'
import { Provider } from 'react-redux'
import { store } from '@/store/index'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()
const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark }
const customLightTheme = { ...MD3LightTheme, colors: Colors.light }

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
})

const CombinedLightTheme = merge(LightTheme, customLightTheme)
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme)
export default function RootLayout() {
    const { colorScheme } = useTheme()
    const [loaded] = useFonts({
        'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    })
    const paperTheme =
        colorScheme === 'dark' ? customDarkTheme : customLightTheme

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <Provider store={store}>
            <PaperProvider theme={paperTheme}>
                <ThemeProvider value={paperTheme}>
                    <Stack>
                        <Stack.Screen
                            name="index"
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="(auth)"
                            options={{ headerShown: false }}
                        />
                    </Stack>

                    <StatusBar backgroundColor="#021432" style="light" />
                </ThemeProvider>
            </PaperProvider>
        </Provider>
    )
}
