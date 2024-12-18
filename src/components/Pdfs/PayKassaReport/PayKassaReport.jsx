/////// hooks
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

////// styles
import { styles } from "./style";
import "./style.scss";

////// helpers

////// components
import Modals from "../../../common/Modals/Modals";
import { Document, Page, Text, pdf } from "@react-pdf/renderer";
import { View, PDFViewer } from "@react-pdf/renderer";

////// icons
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import { simpleDate } from "../../../helpers/transformDate";

const PayKassaReport = ({ pdf: pdfData, setPdf }) => {
  const { state } = useLocation();

  console.log(pdfData);

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const handlePrint = async () => {
    const blob = await pdf(
      <Document>
        <Page size="A4" style={styles.main}>
          <PdfFiles pdfData={pdfData} dataSave={dataSave} />
        </Page>
      </Document>
    )?.toBlob();

    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div className="generateBlock">
      <ConfirmModal
        state={pdfData?.amount}
        yesFN={handlePrint}
        noFN={() => setPdf({})}
        title={"Распечатать бланк ?"}
      />
    </div>
  );
};

export default PayKassaReport;

const PdfFiles = ({ pdfData, dataSave }) => {
  return (
    <>
      <View style={styles.page}>
        <View style={styles.left}>
          <View style={styles.leftHeader}>
            <Text style={styles.titleSmall}>Унифицированная форма № КО-1</Text>
            <Text style={styles.titleSmall}>Утверждена постановлением</Text>
            <Text style={[styles.titleSmall, { textAlign: "left" }]}>
              Нацстаткомитета Кыргызской Республики от 07.04.03 г. №4
            </Text>
          </View>

          <View style={styles.code}>
            <View style={{ display: "flex", alignItems: "flex-end" }}>
              <View style={[]}>
                <Text style={[styles.middleText, styles.form]}></Text>
              </View>
              <View style={[]}>
                <Text style={[styles.middleText, styles.form]}>
                  Форма по ГКУД
                </Text>
              </View>
              <View style={[]}>
                <Text style={[styles.middleText, styles.form]}>
                  ____________________________________________________________
                  по ОКНО
                </Text>
              </View>
              <View style={[]}>
                <Text style={[styles.middleText, styles.form]}>
                  ______________________________________________________________________
                </Text>
              </View>
            </View>
            <View style={styles.sadasdsa}>
              <View style={[styles.linesBlock, { width: 63, marginLeft: 7 }]}>
                <Text style={[styles.middleText]}>Код</Text>
              </View>
              <View style={styles.linesBlock}>
                <Text style={styles.middleText}>0310002</Text>
              </View>
              <View style={styles.linesBlock}></View>
              <View style={[styles.linesBlock, { borderBottom: 1 }]}></View>
            </View>
          </View>

          <View style={styles.leftTitle}>
            <Text style={[styles.bigTitle]}>Приходный кассовый ордер</Text>

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View
                  style={[styles.tableCol, { width: 60, textAlign: "center" }]}
                >
                  <Text style={[styles.textTitle, { padding: 2 }]}>
                    Номер документа
                  </Text>
                </View>
                <View
                  style={[styles.tableCol, { width: 60, textAlign: "center" }]}
                >
                  <Text style={[styles.textTitle, { padding: 2 }]}>
                    Дата составления
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[styles.tableCol, { width: 60, height: 25 }]}
                ></View>
                <View style={[styles.tableCol, { width: 60, height: 25 }]}>
                  <Text style={[styles.textTitle, { padding: 2 }]}>
                    {simpleDate(pdfData?.date)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCol]}>
                <Text style={[styles.textTitle]}>Дебет</Text>
              </View>
              <View style={[styles.tableCol]}>
                <Text style={[styles.textTitle]}></Text>
              </View>
              <View style={[styles.tableCol]}>
                <Text style={[styles.textTitle]}>
                  код структур ного подразде ления
                </Text>
              </View>
              <View style={[styles.tableCol]}>
                <Text style={[styles.textTitle]}>коррес пондирую щий счёт</Text>
              </View>
              <View style={[styles.tableCol]}>
                <Text style={[styles.textTitle]}>
                  код аналити ческого учёта
                </Text>
              </View>
              <View style={[styles.tableCol]}>
                <Text style={[styles.textTitle]}>Сумма сом, тыйын</Text>
              </View>
              <View style={[styles.tableCol]}>
                <Text style={[styles.textTitle]}>Код целевого назначе ния</Text>
              </View>
              <View style={[styles.tableCol]}>
                <Text style={[styles.textTitle]}></Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={[styles.tableCol, styles.tableColBottom]}></View>
              <View style={[styles.tableCol, styles.tableColBottom]}></View>
              <View style={[styles.tableCol, styles.tableColBottom]}></View>
              <View style={[styles.tableCol, styles.tableColBottom]}></View>
              <View style={[styles.tableCol, styles.tableColBottom]}></View>
              <View style={[styles.tableCol, styles.tableColBottom]}></View>
              <View style={[styles.tableCol, styles.tableColBottom]}></View>
              <View style={[styles.tableCol, styles.tableColBottom]}></View>
            </View>

            <View style={styles.moreTable}>
              <Text style={[styles.textTitle, , { paddingTop: 3 }]}>
                Кредит
              </Text>
            </View>
          </View>

          <View style={styles.flexLines}>
            <Text style={[styles.textSmall, styles.lineText]}>Принято от</Text>
            <View style={styles.line}>
              <Text style={styles.textSmall}>{dataSave?.fio}</Text>
            </View>
          </View>
          <View style={styles.flexLines}>
            <Text style={[styles.textSmall, styles.lineText]}>Основание:</Text>
            <View style={styles.line}>
              <Text style={styles.textSmall}>выручка</Text>
            </View>
          </View>
          <View style={styles.flexLines}>
            <Text style={[styles.textSmall, styles.lineText]}>Сумма:</Text>
            <View style={styles.line}>
              <Text style={styles.textSmall}>{pdfData?.amount} сом</Text>
            </View>
          </View>
          <View style={styles.flexLines}>
            <Text style={[styles.textSmall, styles.lineText]}>Приложение:</Text>
            <View style={styles.line}></View>
          </View>
          <View style={styles.flexLines}>
            <Text style={[styles.textSmall, styles.lineText]}>
              Главный бухгалтер
            </Text>
            <View style={[styles.line, { width: "40%" }]}>
              <Text style={styles.moreText}>подпись</Text>
            </View>
            <View style={[styles.line, { width: "40%" }]}>
              <Text style={styles.moreText}>расшифровка подписи</Text>
            </View>
          </View>
          <View style={styles.flexLines}>
            <Text style={[styles.textSmall, styles.lineText]}>
              Получил кассир
            </Text>
            <View style={[styles.line, { width: "40%" }]}>
              <Text style={styles.moreText}>подпись</Text>
            </View>
            <View style={[styles.line, { width: "40%" }]}>
              <Text style={styles.moreText}>расшифровка подписи</Text>
            </View>
          </View>
        </View>

        <View style={styles.right}>
          <Text style={[styles.textSmall, styles.riha]}>Риха</Text>
          <Text style={styles.line100}>Наименование субъекта</Text>
          <Text style={styles.title}>Квитанция</Text>
          <Text style={styles.middleText}>
            К приходному кассовому ордеру № 2/14
          </Text>

          <View style={styles.rightInner}>
            <Text style={styles.textSmall}>
              от "____"_______________________ г
            </Text>
            <Text style={[styles.textSmall]}>Принято от {dataSave?.fio}</Text>
            <Text style={styles.textSmall}>
              ________________________________
            </Text>
            <Text style={styles.textSmall}>Основание: выручка</Text>
            <Text style={styles.textSmall}>
              ________________________________
            </Text>
            <Text style={styles.textSmall}>
              ________________________________
            </Text>
            <Text style={styles.textSmall}>
              ________________________________
            </Text>
            <Text style={styles.textSmall}>
              Сумма {pdfData?.amount} сом 0 тыйын
            </Text>
            <Text style={styles.textSmall}>
              ________________________________
            </Text>
            <Text style={styles.textSmall}>
              ________________________________
            </Text>
            <Text style={styles.textSmall}>
              ________________________________
            </Text>
            <Text style={styles.textSmall}>
              В том числе ___________________
            </Text>
            <Text style={styles.textSmall}>
              "____"_________________________ г
            </Text>
            <Text style={[styles.textSmall, { paddingLeft: 20 }]}>
              М. П. (штампа)
            </Text>
            <Text style={styles.textSmall}>
              Гл. бух. ________ ________________
            </Text>
            <View style={styles.bottomText}>
              <Text style={[styles.textMini]}>подпись</Text>
              <Text style={[styles.textMini]}>расшифровка</Text>
            </View>
            <Text style={styles.textSmall}>
              Кассир ________ ________________
            </Text>
            <View style={styles.bottomText}>
              <Text style={[styles.textMini]}>подпись</Text>
              <Text style={[styles.textMini]}>расшифровка</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.shadow}></View>
    </>
  );
};
