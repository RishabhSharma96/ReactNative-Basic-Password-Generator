import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Font from 'expo-font';
import { number, object } from 'yup';
import "../global.css";
import { Formik } from 'formik';
import BouncyCheckBox from 'react-native-bouncy-checkbox'

const passwordSchema = object({
    length: number()
        .min(6, "Password must be of min 6 characters")
        .max(16, "Password must be of max 12 characters")
        .required("Length is required"),
});

const Home = () => {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [password, setPassword] = useState("")
    const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
    const [passwordLength, setPasswordLength] = useState(0)
    const [smallCaseTaken, setSmallCaseTaken] = useState(true)
    const [upperCaseTaken, setUpperCaseTaken] = useState(false)
    const [specialCharactersTaken, setSpecialCharactersTaken] = useState(false)
    const [numericTaken, setNumericTaken] = useState(false)

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Poppins_400Regular: require('../assets/fonts/Poppins-Regular.ttf'),
            });
            setFontLoaded(true);
        }
        loadFonts();
    }, []);
    if (!fontLoaded) return null;

    const generatePassword = () => {
        let templateString = "";
        const caps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const small = "abcdefghijklmnopqrstuvwxyz";
        const special = "[];,.{}@#$%$^&*()-+";
        const nums = "0123456789";
    
        if (smallCaseTaken) templateString += small;
        if (upperCaseTaken) templateString += caps;
        if (specialCharactersTaken) templateString += special;
        if (numericTaken) templateString += nums;
    
        let currPassword = "";
    
        for (let i = 0; i < passwordLength; i++) {
            const idx = Math.floor(Math.random() * templateString.length);
            currPassword += templateString.charAt(idx);
        }
    
        return currPassword; 
    };

    const resetFormState = () => {
        setIsPasswordGenerated(false);
        setPassword("")
        setPasswordLength(0)
        setSmallCaseTaken(true)
        setUpperCaseTaken(false)
        setNumericTaken(false)
        setSpecialCharactersTaken(false)
    }

    return (
        <ScrollView keyboardShouldPersistTaps="handled" className="bg-slate-900">
            <View className="flex items-center mt-5">
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-green-400 text-4xl">
                    Random Password
                </Text>
                <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-green-400 text-4xl">
                    Generator
                </Text>
            </View>

            <View>

                <Formik
                    initialValues={{ length: '' }}
                    validationSchema={passwordSchema}
                    onSubmit={values => {
                        console.log(values);
                        setPasswordLength(Number(values.length));
                        const newPassword = generatePassword(); 
                        setPassword(newPassword); 
                        setIsPasswordGenerated(true); 
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        isValid,
                        handleChange,
                        handleSubmit,
                        handleReset,
                    }) => (
                        <>

                            <View className="mt-5 flex gap-2">
                                <View className="flex justify-center items-center">
                                    <TextInput
                                        className="border-2 border-green-400 w-[90%] h-16 pl-5 text-green-400 text-xl rounded-md"
                                        placeholder='Enter Password Length'
                                        placeholderTextColor="#00F000"
                                        value={values.length}
                                        onChangeText={handleChange('length')}
                                        keyboardType='numeric'
                                    />
                                </View>
                                {touched.length && errors.length && <Text className="text-red-500 ml-5 mt-[-5px]">
                                    {"*"}{errors.length}
                                </Text>}
                            </View>

                            <View className="border-2 border-green-400 flex flex-row pl-5 items-center text-green-400 text-xl rounded-md w-[90%] m-auto mt-2 h-16">
                                <BouncyCheckBox
                                    className="h-16"
                                    size={25}
                                    disableBuiltInState
                                    isChecked={smallCaseTaken}
                                    fillColor="#00F000"
                                    onPress={() => setSmallCaseTaken(!smallCaseTaken)}
                                />
                                <Text className="text-green-400 text-xl flex justify-center items-center">Include Small Case Alphabets</Text>
                            </View>

                            <View className="border-2 border-green-400 flex flex-row pl-5 items-center text-green-400 text-xl rounded-md w-[90%] m-auto mt-2 h-16">
                                <BouncyCheckBox
                                    className="h-16"
                                    size={25}
                                    disableBuiltInState
                                    isChecked={upperCaseTaken}
                                    fillColor="#00F000"
                                    onPress={() => setUpperCaseTaken(!upperCaseTaken)}
                                />
                                <Text className="text-green-400 text-xl flex justify-center items-center">Include Upper Case Alphabets</Text>
                            </View>

                            <View className="border-2 border-green-400 flex flex-row pl-5 items-center text-green-400 text-xl rounded-md w-[90%] m-auto mt-2 h-16">
                                <BouncyCheckBox
                                    className="h-16"
                                    size={25}
                                    disableBuiltInState
                                    isChecked={specialCharactersTaken}
                                    fillColor="#00F000"
                                    onPress={() => setSpecialCharactersTaken(!specialCharactersTaken)}
                                />
                                <Text className="text-green-400 text-xl flex justify-center items-center">Include Special Characters</Text>
                            </View>

                            <View className="border-2 border-green-400 flex flex-row pl-5 items-center text-green-400 text-xl rounded-md w-[90%] m-auto mt-2 h-16">
                                <BouncyCheckBox
                                    className="h-16"
                                    size={25}
                                    disableBuiltInState
                                    isChecked={numericTaken}
                                    fillColor="#00F000"
                                    onPress={() => setNumericTaken(!numericTaken)}
                                />
                                <Text className="text-green-400 text-xl flex justify-center items-center">Include Numeric Characters</Text>
                            </View>

                            <View className="flex justify-center items-center mt-5">
                                <TouchableOpacity 
                                    disabled = {!isValid}
                                    onPress={handleSubmit}
                                className="bg-green-400 w-[90%] h-14 rounded-md flex justify-center items-center">
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-green-800 uppercase flex items-center justify-center">
                                        Generate
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View className="flex justify-center items-center mt-2">
                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            handleReset();
                                            resetFormState()
                                        }
                                    }
                                className="border-2 border-green-400  w-[90%] h-14 rounded-md flex justify-center items-center">
                                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-white uppercase flex items-center justify-center">
                                        Reset
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>

            </View>

            {isPasswordGenerated && <View className="flex items-center">
                <View className="flex items-center justify-center mt-5 p-5 rounded-md w-[90%]">
                    <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-green-400 text-4xl font-extrabold mb-1">
                        Your Password:
                    </Text>
                    <Text selectable style={{ fontFamily: 'Poppins_400Regular' }} className="text-green-400 text-3xl">
                        {password}
                    </Text>
                </View></View>}

        </ScrollView>
    );
};

export default Home;