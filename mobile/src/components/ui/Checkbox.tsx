import { TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  checked: boolean;
  onChange: () => void;
};

export function Checkbox({ checked, onChange }: Props) {
  return (
    <TouchableOpacity
      onPress={onChange}
      className="h-5 w-5 items-center justify-center rounded border border-gray-400"
    >
      {checked && (
        <Ionicons name="checkmark" size={14} color="#0384c6" />
      )}
    </TouchableOpacity>
  );
}
