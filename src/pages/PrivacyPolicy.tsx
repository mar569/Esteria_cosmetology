import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Link to="/">
                    <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Вернуться на главную
                    </Button>
                </Link>

                <div className="card-gradient rounded-2xl p-8 md:p-12 border border-border">
                    <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
                        Политика конфиденциальности
                    </h1>

                    <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Защита данных</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Администрация сайта самозанятый Ефимина Марианна Владимировна, ИНН: 470613070838 не может передать или раскрыть информацию,
                                предоставленную пользователем, третьим лицам, кроме случаев, описанных законодательством РФ
                                (Федеральный закон № 152-ФЗ «О персональных данных»).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Получение персональной информации</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Сайт не собирает персональные данные пользователей напрямую. Для связи используйте ссылки на мессенджеры.
                                Любые данные, предоставленные в мессенджерах, обрабатываются их операторами.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Использование персональной информации</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Сайт использует техническую информацию (IP-адрес, браузер) для улучшения работы.
                                Мы прилагаем усилия для сохранения данных в безопасности. Информация может быть раскрыта только в случаях,
                                описанных законодательством РФ.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Передача данных третьим лицам</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Мы не передаём данные третьим лицам. При переходе по ссылкам на мессенджеры (WhatsApp, Telegram, ВКонтакте)
                                любые данные обрабатываются их операторами в соответствии с их политиками конфиденциальности.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Коммуникация</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Связь происходит через мессенджеры. Вы можете отказаться от коммуникации в любой момент.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Ссылки</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                На сайте могут содержаться ссылки на другие сайты. Сайт не несёт ответственности за их содержание,
                                качество и политику безопасности.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Безопасность</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Сайт обеспечивает безопасность данных с помощью HTTPS и регулярных обновлений.
                                Мы оставляем за собой право вносить изменения в Политику конфиденциальности без дополнительных уведомлений.
                                Нововведения вступают в силу с момента их опубликования.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Чат-ассистент</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Сайт использует чат-ассистент на основе AI для ответов на вопросы. Сообщения обрабатываются анонимно и не сохраняются на сайте. Продолжая чат, вы соглашаетесь с обработкой сообщений для генерации ответов.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mt-3">
                                Сообщения могут передаваться третьему лицу (AI-сервису) для обработки, в соответствии с их политикой конфиденциальности. Если вы предоставите персональные данные (имя, телефон), они будут использованы только для ответа и не сохранятся.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Права субъекта персональных данных</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                В соответствии с ФЗ-152 вы имеете право:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                                <li>Получить информацию об обработке ваших данных</li>
                                <li>Требовать уточнения, блокирования или уничтожения данных</li>

                            </ul>
                            <p className="text-muted-foreground leading-relaxed mt-3">
                                Для реализации прав направьте запрос на <a href="mailto:marianna.esteria@mail.ru" className="font-semibold underline">marianna.esteria@mail.ru</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-4">Контакты</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Email: <a href="mailto:marianna.esteria@mail.ru" className="font-semibold underline">marianna.esteria@mail.ru</a>, Телефон: <a href="tel:+79657887750" className="font-semibold underline">+7 (965) 788-77-50</a>, Адрес: Шлиссельбург, ул. Чекалова, 10.
                            </p>
                        </section>

                    </div>
                </div>


            </div>
        </div>
    );
};

export default PrivacyPolicy;