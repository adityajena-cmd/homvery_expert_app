import React from 'react';
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const FormDropDown = (props) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(props.value);
    const { label } = props;
    return (
        <View style={{ marginBottom: 10, zIndex: 5 }}>
            {
                label && <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>{label}</Text>
            }
            <DropDownPicker
                style={{ borderColor: '#4A4FBE', borderWidth: 1 }}
                showTickIcon={false}
                dropDownContainerStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: '#4A4FBE', borderWidth: 1
                    
                }}
                containerStyle={{
                    borderColor: '#4A4FBE',
                    backgroundColor: '#ffffff',
                    zIndex: 5
                }}
                placeholderStyle={{color: '#D8D8D8'}}

                selectedItemContainerStyle={{
                    backgroundColor: '#4A4FBE',
                }}
                selectedItemLabelStyle={{
                    color: "#ffffff"
                }}
                open={open}
                onChangeValue={(val)=>{console.log(val)}}
                value={props.value}
                items={props.items}
                setOpen={setOpen}
                onSelectItem={(item)=>{props.setValue(item.value)}}
            />
        </View>
    );
}

export default FormDropDown;