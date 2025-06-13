import React, { useState } from "react";
import { View, Alert } from "react-native";
import useDebt from "../components/hooks/useDebt";

// Import our new components
import DebtHeader from "../components/debt/DebtHeader";
import DebtList from "../components/debt/DebtList";
import DebtModal from "../components/debt/DebtModal";

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
  
  return (
    <View className="flex-1 h-screen bg-[#0E1D12] p-4 ">
      {/* Header Component */}
      <DebtHeader onAddPress={prepareAddForm} />

      {/* Debt List Component */}
      <DebtList
        debts={debts}
        loading={loading}
        onEditPress={prepareEditForm}
        onDeletePress={handleDelete}
      />
      
      {/* Add Debt Modal */}
      <DebtModal
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
        title="Add New Debt"
        formData={formData}
        handleChange={handleChange}
        onSubmit={handleAddSubmit}
        buttonText="Save"
      />
      
      {/* Edit Debt Modal */}
      <DebtModal
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
        title="Edit Debt"
        formData={formData}
        handleChange={handleChange}
        onSubmit={handleEditSubmit}
        buttonText="Update"
      />
    </View>
  );
}