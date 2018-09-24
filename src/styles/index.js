import { StyleSheet, Text, View } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#47515b',
    },
    text: {
        color:'#fff',
        margin: 10,
    },
    cover_image: {
        height: 250,
    },
    appName: {
        fontSize: 24,
    },
    userID_enter: {
        textAlign: 'center',
        fontSize: 20,
    },
    wallList: {
        marginTop:10,
    },
    wallListItem: {
        fontSize: 20,
        borderColor: '#fff',
        borderBottomWidth: 1,
        paddingBottom:18,
    },
    wallID: {
        textAlign: 'right',
        fontSize: 20,
    },
    wallSubInfo: {
        textAlign: 'left',
        fontSize: 17,
    },
    newHere: {
        textAlign: 'center',
        fontSize: 25,
        paddingTop:20,
        paddingBottom:20,
    },
    promptScan: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
