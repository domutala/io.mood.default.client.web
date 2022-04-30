export interface Key {
  index: string;
  native?: boolean;
  type: string;
  placeholder: { [key: string]: string };

  array?: { min_length?: number; max_length?: number };
  value: any;

  props: {
    required?: boolean;
    min_length?: number;
    max_length?: number;
    min?: number;
    max?: number;
    options?: { text: string; value: any }[];
  };
}
