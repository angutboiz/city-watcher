import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'

const Privacy = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Quyền riêng tư và bảo mật',
            headerBackTitle: 'Quay lại',
        })
    }, [navigation])
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>
                    SUMMARY OF KEY POINTS This summary provides key points from
                    our Privacy Notice, but you can find out more details about
                    any of these topics by clicking the link following each key
                    point or by using our table of contents below to find the
                    section you are looking for. What personal information do we
                    process? When you visit, use, or navigate our Services, we
                    may process personal information depending on how you
                    interact with us and the Services, the choices you make, and
                    the products and features you use. Learn more about personal
                    information you disclose to us. Do we process any sensitive
                    personal information? Some of the information may be
                    considered 'special' or 'sensitive' in certain
                    jurisdictions, for example your racial or ethnic origins,
                    sexual orientation, and religious beliefs. We may process
                    sensitive personal information when necessary with your
                    consent or as otherwise permitted by applicable law. Learn
                    more about sensitive information we process. Do we collect
                    any information from third parties? We do not collect any
                    information from third parties. How do we process your
                    information? We process your information to provide,
                    improve, and administer our Services, communicate with you,
                    for security and fraud prevention, and to comply with law.
                    We may also process your information for other purposes with
                    your consent. We process your information only when we have
                    a valid legal reason to do so. Learn more about how we
                    process your information. In what situations and with which
                    parties do we share personal information? We may share
                    information in specific situations and with specific third
                    parties. Learn more about when and with whom we share your
                    personal information. How do we keep your information safe?
                    We have adequate organisational and technical processes and
                    procedures in place to protect your personal information.
                    However, no electronic transmission over the internet or
                    information storage technology can be guaranteed to be 100%
                    secure, so we cannot promise or guarantee that hackers,
                    cybercriminals, or other unauthorised third parties will not
                    be able to defeat our security and improperly collect,
                    access, steal, or modify your information. Learn more about
                    how we keep your information safe. What are your rights?
                    Depending on where you are located geographically, the
                    applicable privacy law may mean you have certain rights
                    regarding your personal information. Learn more about your
                    privacy rights. How do you exercise your rights? The easiest
                    way to exercise your rights is by submitting a data subject
                    access request, or by contacting us. We will consider and
                    act upon any request in accordance with applicable data
                    protection laws. Want to learn more about what we do with
                    any information we collect? Review the Privacy Notice in
                    full.
                </Text>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Privacy

const styles = StyleSheet.create({})
