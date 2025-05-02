import React, { useState } from "react";
import { 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  Alert, 
  Modal, 
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform 
} from "react-native";
import DebtItem from "../components/helper/DebItem";
import useDebt from "../components/hooks/useDebt";
import { Calendar, Edit, Trash2 } from "lucide-react-native";

export default function DebtScreen() {
  // Use our custom hook for CRUD operations
  const { debts, loading, error, addDebt, updateDebt, deleteDebt } = useDebt();
  
  // State for managing modals and form data
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentDebt, setCurrentDebt] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    amount: '',
    date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
  });
  
  // Reset form data for add mode
  const prepareAddForm = () => {
    setFormData({
      category: '',
      description: '',
      amount: '',
      date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    });
    setAddModalVisible(true);
  };
  
  // Prepare form for edit mode
  const prepareEditForm = (debt) => {
    setCurrentDebt(debt);
    setFormData({
      category: debt.category,
      description: debt.description,
      amount: debt.amount.toString(),
      date: debt.date
    });
    setEditModalVisible(true);
  };
  
  // Handle form changes
  const handleChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };
  
  // CREATE - Handle add debt submission
  const handleAddSubmit = async () => {
    if (!formData.category || !formData.description || !formData.amount) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    
    const debtData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    const result = await addDebt(debtData);
    
    if (result) {
      setAddModalVisible(false);
      Alert.alert("Success", "Debt added successfully");
    } else {
      Alert.alert("Error", "Failed to add debt");
    }
  };
  
  // UPDATE - Handle edit debt submission
  const handleEditSubmit = async () => {
    if (!formData.category || !formData.description || !formData.amount) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    
    const updates = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    const result = await updateDebt(currentDebt.id, updates);
    
    if (result) {
      setEditModalVisible(false);
      Alert.alert("Success", "Debt updated successfully");
    } else {
      Alert.alert("Error", "Failed to update debt");
    }
  };
  
  // DELETE - Handle debt deletion
  const handleDelete = (debt) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete the debt for ${debt.description}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            const success = await deleteDebt(debt.id);
            if (success) {
              Alert.alert("Success", "Debt deleted successfully");
            } else {
              Alert.alert("Error", "Failed to delete debt");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  // Show error if something went wrong
  if (error) {
    Alert.alert("Error", error);
  }
  
  // Form component used for both Add and Edit
  const DebtForm = ({ onSubmit, buttonText }) => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View className="bg-[#1A2F1E] p-5 rounded-lg w-full">
        <Text className="text-white mb-1">Category</Text>
        <TextInput
          className="bg-[#333] text-white p-3 rounded-md mb-3"
          placeholder="Loan, Credit Card, Personal, etc."
          placeholderTextColor="#888"
          value={formData.category}
          onChangeText={(text) => handleChange('category', text)}
        />
        
        <Text className="text-white mb-1">Description</Text>
        <TextInput
          className="bg-[#333] text-white p-3 rounded-md mb-3"
          placeholder="Description of debt"
          placeholderTextColor="#888"
          value={formData.description}
          onChangeText={(text) => handleChange('description', text)}
        />
        
        <Text className="text-white mb-1">Amount (PHP)</Text>
        <TextInput
          className="bg-[#333] text-white p-3 rounded-md mb-3"
          placeholder="Amount"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={formData.amount}
          onChangeText={(text) => handleChange('amount', text)}
        />
        
        <View className="flex-row justify-center mt-4 space-x-3">
          <TouchableOpacity 
            className="bg-gray-600 px-5 py-3 rounded-lg"
            onPress={() => {
              setAddModalVisible(false);
              setEditModalVisible(false);
            }}
          >
            <Text className="text-white font-semibold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-green-600 px-5 py-3 rounded-lg"
            onPress={onSubmit}
          >
            <Text className="text-white font-semibold">{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
  
  return (
    <View className="flex-1 bg-[#0E1D12] p-4 mb-20">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-white">Debt List</Text>
        <TouchableOpacity
          onPress={prepareAddForm}
          className="bg-green-600 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Add Debt</Text>
        </TouchableOpacity>
      </View>

      {/* Debt Items List - READ operation */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#7BE495" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="pb-10">
          {debts.length === 0 ? (
            <View className="flex-1 justify-center items-center my-10">
              <Text className="text-white text-center">No debts found. Add one to get started!</Text>
            </View>
          ) : (
            debts.map((debt) => (
              <View key={debt.id} className="mb-4">
                <DebtItem item={debt} />
                <View className="flex-row justify-end mt-1 space-x-2">
                  {/* Edit button - Opens UPDATE form */}
                  <TouchableOpacity 
                    onPress={() => prepareEditForm(debt)}
                    className="bg-[#3A3A3A] p-2 rounded-full"
                  >
                    <Edit size={18} color="#7BE495" />
                  </TouchableOpacity>
                  
                  {/* Delete button - Triggers DELETE operation */}
                  <TouchableOpacity 
                    onPress={() => handleDelete(debt)}
                    className="bg-[#3A3A3A] p-2 rounded-full"
                  >
                    <Trash2 size={18} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
          <View className="h-20" />
        </ScrollView>
      )}
      
      {/* Add Debt Modal - CREATE operation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center p-5 bg-black/70">
          <View className="w-full">
            <Text className="text-white text-xl font-bold mb-4 text-center">Add New Debt</Text>
            <DebtForm onSubmit={handleAddSubmit} buttonText="Save" />
          </View>
        </View>
      </Modal>
      
      {/* Edit Debt Modal - UPDATE operation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center p-5 bg-black/70">
          <View className="w-full">
            <Text className="text-white text-xl font-bold mb-4 text-center">Edit Debt</Text>
            <DebtForm onSubmit={handleEditSubmit} buttonText="Update" />
          </View>
        </View>
      </Modal>
    </View>
  );
}