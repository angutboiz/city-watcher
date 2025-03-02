import 'dotenv/config'

export default {
    expo: {
        name: 'CityWatcher',
        slug: 'city-watcher',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/icon.png',
        splash: {
            image: './assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        android: {
            package: 'com.citywatcher.app',
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#FFFFFF',
            },
            permissions: [
                'android.permission.CAMERA',
                'android.permission.ACCESS_FINE_LOCATION',
                'android.permission.ACCESS_COARSE_LOCATION',
                'android.permission.READ_EXTERNAL_STORAGE',
                'android.permission.WRITE_EXTERNAL_STORAGE',
            ],
        },
        ios: {
            bundleIdentifier: 'com.citywatcher.app',
            buildNumber: '1.0.0',
            infoPlist: {
                NSLocationWhenInUseUsageDescription:
                    'This app needs access to location to show incidents nearby.',
                NSCameraUsageDescription:
                    'This app needs access to the camera to take photos of incidents.',
                NSPhotoLibraryUsageDescription:
                    'This app needs access to photos for uploading incident images.',
            },
        },
        extra: {
            eas: {
                projectId: '52b111a0-c2ea-4fee-8dff-e35e94afe5cc',
            },
        },
        plugins: [
            [
                'expo-camera',
                {
                    cameraPermission:
                        'Allow CityWatcher to access your camera.',
                },
            ],
            'expo-location',
            'expo-image-picker',
        ],
        eas: {
            projectId: '52b111a0-c2ea-4fee-8dff-e35e94afe5cc',
        },
    },
}
