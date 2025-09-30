import { 
    HistoryContainer, 
    HistoryList,
    Status
 } from './styles'

export function History() {
    return(
       <HistoryContainer>
            <h1>Meu Histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Tarefa
                            </th>
                            <th>
                                Duração 
                            </th>
                            <th>
                                Inicio
                            </th>
                            <th>
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tarefa</td>
                            <td>Duração</td>
                            <td>Data de Inicio</td>
                            <td>
                                <Status statusColor='green'> Pendente </Status>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
       </HistoryContainer>
    );
}