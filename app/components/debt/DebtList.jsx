import React, { useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Edit, Trash2 } from "lucide-react-native";
import DebtItem from "../helper/DebItem";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DebtList = ({ debts, loading, onEditPress, onDeletePress }) => {
  const [selectedId, setSelectedId] = useState(null);
  const swipeableRefs = useRef({});

  const handleLongPress = (debtId) => {
    setSelectedId(selectedId === debtId ? null : debtId);
  };

  const renderRightActions = (debt) => {
    return (
      <View className="flex-row">
        {/* Edit button */}
        <TouchableOpacity
          onPress={() => {
            onEditPress(debt);
            if (swipeableRefs.current[debt.id]) {
              swipeableRefs.current[debt.id].close();
            }
          }}
          className=" w-14 h-full justify-center items-center"
        >
          <Edit size={30} color="#7BE495" />
        </TouchableOpacity>

        {/* Delete button */}
        <TouchableOpacity
          onPress={() => {
            onDeletePress(debt);
            if (swipeableRefs.current[debt.id]) {
              swipeableRefs.current[debt.id].close();
            }
          }}
          className=" bg-gray w-14 h-full justify-center items-center  " 
        >
          <Trash2 size={30} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7BE495" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} className="pb-10">
        {debts.length === 0 ? (
          <View className="flex-1 justify-center items-center ">
            <Text className="text-white text-center">
              No debts found. Add one to get started!
            </Text>
          </View>
        ) : (
          debts.map((debt) => (
            <Swipeable
              key={debt.id}
              ref={(ref) => (swipeableRefs.current[debt.id] = ref)}
              renderRightActions={() => renderRightActions(debt)}
              overshootRight={false}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onLongPress={() => handleLongPress(debt.id)}
                className={` ${selectedId === debt.id ? 'opacity-70' : ''}`}
              >
                <DebtItem item={debt} />
              </TouchableOpacity>
            </Swipeable>
          ))
        )}
        <View className="h-20" />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default DebtList;