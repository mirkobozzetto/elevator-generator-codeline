import { SettingsProps } from "@/types/types";
import { useState } from "react";

const useSettings = (initialSettings: SettingsProps) => {
  const [settings, setSettings] = useState<SettingsProps>(initialSettings);

  const updateSetting = (key: keyof SettingsProps, value: number) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  return [settings, updateSetting] as const;
};

export default useSettings;
