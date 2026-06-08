import DatePicker, { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import inputStyles from './InputField.module.css';
import datePickerStyles from './DatePickerCustom.module.css';

registerLocale('pt-BR', ptBR);

export default function DatePickerField({ label, id, value, onChange, erro, modoEscuro = false }) {
  return (
    <div className={`${inputStyles.grupoInput} ${datePickerStyles.datePickerWrapper}`}>
      <label
        htmlFor={id}
        className={modoEscuro ? inputStyles.labelDark : inputStyles.labelLight}
      >
        {label}
      </label>
      <div className={modoEscuro ? datePickerStyles.datePickerWrapper : datePickerStyles.datePickerWrapperLight}>
        <DatePicker
          id={id}
          selected={value ? new Date(value) : null}
          onChange={(data) => onChange(data ? data.toISOString().split('T')[0] : '')}
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          maxDate={new Date()}
          placeholderText="dd/mm/aaaa"
          className={modoEscuro ? inputStyles.inputDark : inputStyles.inputLight}
        />
      </div>
      {erro && (
        <span className={`${inputStyles.erroInline} ${modoEscuro ? inputStyles.erroInlineDark : inputStyles.erroInlineLight}`}>
          ⚠️ {erro}
        </span>
      )}
    </div>
  );
}