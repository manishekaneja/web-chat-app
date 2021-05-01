type SearrchInputProps = {
  onChange?: (value: string) => void;
  debouncedChange?: (value: string) => void;
  debouncedTime?: number;
  onClear?: () => void;
  loading?: boolean;
};
