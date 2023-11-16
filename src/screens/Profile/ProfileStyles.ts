import {StyleSheet} from 'react-native';
const style = StyleSheet.create({
  btnfield: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
    height: 59,
    marginTop: 30,

    backgroundColor: '#3E54AC',
    borderRadius: 13,
  },
  btntext: {
    position: 'absolute',
    left: 120,
    top: 15,
    height: 29,
    width: 104,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: 20,
    color: 'white',
  },

  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: 'red',
    shadowColor: '#3E54AC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    marginTop: 80,
  },
  profileStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ECF2FF',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#3E54AC',
    fontFamily: 'poppins',
    fontSize: 22,
    padding: 16,
  },

  profileFields: {
    height: 300,
  },
  editprofile: {
    backgroundColor: '#FFFFFF',
    color: 'white',
  },
  whiteBtn: {
    alignItems: 'center',
    textAlign: 'center',
    width: 300,
    height: 59,
    backgroundColor: 'white',
    borderRadius: 13,
    flexDirection: 'row',
    marginBottom: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnPText: {
    position: 'absolute',
    left: 100,
    top: 15,
    height: 29,
    width: 200,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: 20,
    color: '#3E54AC',
    alignItems: 'center',
  },
  AddressbtnPText: {
    position: 'absolute',
    left: 110,
    top: 15,
    height: 29,
    width: 200,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: 20,
    color: '#3E54AC',
    alignItems: 'center',
  },

  imageContainer: {
    zIndex: 1,
  },

  buttonContainer: {
    marginTop: 15,
    zIndex: 2,
  },
});
export default style;
