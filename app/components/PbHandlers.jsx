import React from "react";
import ProfileButton from "./profileButton";
import { UserCog, ShieldCheck, Settings } from "lucide-react-native";

export default function ProfileButtonHandlers() {
  const handleChangeAccount = () => {
    console.log("Change account details tapped!");
    // router.push('/account-details');
  };

  const handleAccountRecovery = () => {
    console.log("Account recovery tapped!");
    // router.push('/account-recovery');
  };

  const handleOtherSettings = () => {
    console.log("Other settings tapped!");
    // router.push('/other-settings');
  };

  return (
    <>
      <ProfileButton
        label="Change account details"
        onPress={handleChangeAccount}
        icon={UserCog}
        borderColor="green"
      />

      <ProfileButton
        label="Account Recovery"
        onPress={handleAccountRecovery}
        icon={ShieldCheck}
        borderColor="green"
      />

      <ProfileButton
        label="Other settings"
        onPress={handleOtherSettings}
        icon={Settings}
        borderColor="green"
      />
    </>
  );
}
