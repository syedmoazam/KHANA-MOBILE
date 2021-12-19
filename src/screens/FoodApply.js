import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Platform, ScrollView as Scroll, Image } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { theme } from '../core/theme'
import BackButton from '../components/BackButton'
import DateTimePicker from '@react-native-community/datetimepicker'
import Toast from '../components/Toast'
import RNPickerSelect from 'react-native-picker-select';
import { logoutUser } from '../api/auth-api'
import { saveData } from '../api/auth-api'
// import UploadImage from '../components/Uploadimage'
import * as ImagePicker from 'expo-image-picker';
export default function FoodApply({ route, navigation }) {
    const { location } = route.params
    console.log(location, 'ha qareeb');
    const [name, setName] = useState({ value: '', error: '' })
    const [fname, setFName] = useState({ value: '', error: '' })
    const [cnic, setCNIC] = useState({ value: '', error: '' })
    const [income, setMincome] = useState({ value: '', error: '' })
    const [fmembers, setFMembers] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Please Select Date of Birth');
    const [dropDown, setDropDown] = useState("Please Select")
    const [image, setImage] = useState(null);
    useEffect(async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission denied!')
            }
        }
    }, [])
    // console.log(itemId)
    const userData = {
        name: name.value,
        fatherName: fname.value,
        cnic: cnic.value,
        income: income.value,
        familyMembers: fmembers.value,
        ration: dropDown,
        dob: text,
        loc: location
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setText(fDate)

        console.log(fDate)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        console.log(result)
        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    const handleInputChange = (text) => {
        if (/^\d+$/.test(text)) {
            setCNIC(cnic)
        }
    }

    const onSignUpPressed = async () => {
        const nameError = nameValidator(name.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError || nameError) {
            setName({ ...name, error: nameError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }
        setLoading(true)
        const response = await signUpUser({
            name: name.value,
            email: email.value,
            password: password.value,
        })
        if (response.error) {
            setError(response.error)
        }
        setLoading(false)
    }
    const sendData = async () => {
       let wait =  saveData(userData)
       if(wait){
           navigation.replace("RequestComplete")
       }
        console.log(userData)
    }

    return (
        <Scroll>
            <Background>
                <BackButton goBack={navigation.goBack} />
                <Logo />
                <Header>Food Application</Header>
                <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: '' })}
                    error={!!name.error}
                    errorText={name.error}
                />
                <TextInput
                    label="Father's Name"
                    returnKeyType="next"
                    value={fname.value}
                    onChangeText={(text) => setFName({ value: text, error: '' })}
                    error={!!name.error}
                    errorText={name.error}
                />
                <TextInput
                    label="CNIC"
                    keyboardType={'numeric'}
                    returnKeyType="next"
                    value={cnic.value}
                    onChangeText={(text) => setCNIC({ value: text, error: '' })}
                    error={!!cnic.error}
                    errorText={cnic.error}
                    numeric
                    maxLength={13}  //setting limit of input
                />
                <TextInput
                    label="Family Members"
                    keyboardType={'numeric'}
                    returnKeyType="next"
                    value={fmembers.value}
                    onChangeText={(text) => setFMembers({ value: text, error: '' })}
                    error={!!fmembers.error}
                    errorText={fmembers.error}
                    numeric
                    maxLength={10}  //setting limit of input
                />
                <TextInput
                    label="Monthly Income"
                    keyboardType={'numeric'}
                    returnKeyType="next"
                    value={income.value}
                    onChangeText={(text) => setMincome({ value: text, error: '' })}
                    error={!!income.error}
                    errorText={income.error}
                    numeric
                    maxLength={13}  //setting limit of input
                />
                <RNPickerSelect
                    placeholder={{ label: " ", value: "default" }}
                    onValueChange={(value) => setDropDown(value)}
                    items={[
                        { label: 'Monthly Ration', value: 'MonthlyRation' },
                        { label: 'Daily1', value: 'Daily1' },
                        { label: 'Daily2', value: 'Daily2' },
                        { label: 'Daily3', value: 'Daily3' },
                    ]}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 20, position: 'absolute', top: 640 }}>{dropDown && dropDown}</Text>

                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{text}</Text>
                <Button onPress={() => showMode('date')} >DOB</Button>
                {show && (<DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />)}
                <Button onPress={()=>PickImage()}>Upload Image</Button>
                {image && <Image source={{ uri: image }} style={{
                    width: 200,
                    height: 200
                }} />}
                <Button
                    loading={loading}
                    mode="contained"
                    onPress={sendData}
                    style={{ marginTop: 24 }}
                >
                    Submit
                </Button>
                <Toast message={error} onDismiss={() => setError('')} />
            </Background>
        </Scroll>
    )
}
const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },

})