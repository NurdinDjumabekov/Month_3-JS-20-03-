/////// hooks
import { useState } from "react";

////// styles
import { styles } from "./style";
import "./style.scss";

////// helpers
import { transformActionDate } from "../../../../helpers/transformDate";
import { formatDateMonth } from "../../../../helpers/transformDate";

////// components
import Modals from "../../../../components/Modals/Modals";
import { Document, Page, Text } from "@react-pdf/renderer";
import { View, PDFViewer } from "@react-pdf/renderer";

////// icons
import FileCopyIcon from "@mui/icons-material/FileCopy";

const GeneratePdf = ({ activeInvoice }) => {
  const nowDate = transformActionDate(new Date());

  const [active, setActive] = useState(false);

  return (
    <div className="generateBlock">
      <button className="activePdf" onClick={() => setActive(true)}>
        <FileCopyIcon />
        <p>Сгенерировать документ</p>
      </button>
      <Modals
        openModal={active}
        closeModal={() => setActive(false)}
        title={`Производство / документ`}
      >
        <PDFViewer>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.header}>Отправитель:</Text>
                <Text style={styles.header}>
                  Отгрузка агенту № _____ , Исаева Светлана - ТА.{" "}
                  {formatDateMonth(nowDate)}
                </Text>
              </View>

              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, styles.numsTitle]}>
                    <Text style={[styles.textTitle, styles.nums]}>№</Text>
                  </View>
                  <View style={[styles.tableCol, styles.names]}>
                    <Text style={styles.textTitle}>Наименование</Text>
                  </View>
                  <View style={[styles.tableCol, styles.headersOther]}>
                    <Text style={styles.textTitle}>Заказано</Text>
                  </View>
                  <View style={[styles.tableCol, styles.headersOther]}>
                    <Text style={styles.textTitle}>Кол-во кг</Text>
                  </View>
                  <View style={[styles.tableCol, styles.headersOther]}>
                    <Text style={styles.textTitle}>Кол-во шт</Text>
                  </View>
                  <View style={[styles.tableCol, styles.headersOther]}>
                    <Text style={styles.textTitle}>Расчётное кол-во</Text>
                  </View>
                  <View style={[styles.tableCol, styles.headersOther]}>
                    <Text style={styles.textTitle}>Цена</Text>
                  </View>
                  <View style={[styles.tableCol, styles.headersOther]}>
                    <Text style={styles.textTitle}>Сумма</Text>
                  </View>
                  <View style={[styles.tableCol, styles.headersOther]}>
                    <Text style={styles.textTitle}>Тара</Text>
                  </View>
                </View>

                {activeInvoice?.products?.map((i, index) => (
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.numsMain]}>
                      <Text style={styles.tableCell}>{index + 1}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.namesInner]}>
                      <Text style={[styles.tableCell, styles.numsInnerText]}>
                        {i?.product_name}
                      </Text>
                    </View>
                    <View style={[styles.tableCol, styles.headersOther]}>
                      <Text style={styles.tableCell}>100 сом</Text>
                    </View>
                    <View style={[styles.tableCol, styles.headersOther]}>
                      <Text style={styles.tableCell}>1000 сом</Text>
                    </View>
                    <View style={[styles.tableCol, styles.headersOther]}>
                      <Text style={styles.tableCell}>1000 сом</Text>
                    </View>
                    <View style={[styles.tableCol, styles.headersOther]}>
                      <Text style={styles.tableCell}>1000 сом</Text>
                    </View>
                    <View style={[styles.tableCol, styles.headersOther]}>
                      <Text style={styles.tableCell}>{i?.price}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.headersOther]}>
                      <Text style={styles.tableCell}>1000 сом</Text>
                    </View>
                    <View style={[styles.tableCol, styles.headersOther]}>
                      <Text style={styles.tableCell}></Text>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.result}></View>

              <View style={styles.footer}>
                <View style={styles.accept}>
                  <View style={styles.acceptSend}>
                    <View style={styles.acceptText}>
                      <Text style={styles.linetext}>Отпустил</Text>
                      <Text style={styles.line}></Text>
                    </View>
                  </View>
                  <View style={styles.acceptSend}>
                    <View style={styles.acceptText}>
                      <Text style={styles.linetext}>Получил</Text>
                      <Text style={styles.line}></Text>
                    </View>
                  </View>
                </View>
                <View style={styles.acceptText}>
                  <Text style={styles.linetext}>Для доставки принял</Text>
                  <Text style={styles.line}></Text>
                </View>
                <View style={[styles.acceptText, styles.acceptTextMore]}>
                  <Text style={styles.linetext}>Комментарий</Text>
                  <Text style={styles.line}></Text>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </Modals>
    </div>
  );
};

export default GeneratePdf;
