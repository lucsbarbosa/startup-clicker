$(document).ready(function(){
    
    let info;
    let valorAlterado;
    let clientes = 1;
    let incremento = 1;
    let clicks = 0;
    let valorAdiciona = 1;
    let aprovacao = 0;
    let negacao = 0;
    let valorAprovacao;
    let valorNegacao;
    let perguntaAberta = false;
    let perguntasSim = ['Todo pequeno experimento é um produto?', 'Precisamos lançar pequenas partes dos produtos, ao invés do produto final, mesmo que tenha baixa qualidade?',
                         'Conforme as sugestões, pode se dizer que um tipo padrão de cliente é criado, e junto a isso, um tipo de produto?', 'O protótipo de produto não precisa ser perfeito, mas ainda sim precisa ter os recursos básicos para um feedback, certo?',
                         'Por mais que você precise especificar seu cliente, é importante manter a acessibilidade a outros grupos?', 'Um pivô nunca é uma certeza, assim como a estratégia da startup, isso está certo?', 
                         'Os lotes devem ser organizados conforme demanda, ao invés de capacidade?', 'Para uma startup pequena que busca crescimento a melhor abordagem de produção é de lote pequeno?', 
                         'Uma startup deve lançar um protótipo do seu produto no mercado para ver a reação dos consumidores?', 'Uma empresa com maior eficiência de capital consegue identificar melhor a hora de pivotar, gastando menos recursos?',
                         'Com os fluxos de clientes é possível ter uma capacidade de previsão para sua empresa maior, comparando-a com as métricas brutas tradicionais?', 'O motor de crescimento por meio de publicidade financiada tem como principal objetivo atingir e influenciar novos clientes a comprarem o produto?',
                         'Alguns produtos podem ser projetados para ser comprados repetidas vezes por meio de um plano de assinatura ou de recompras voluntárias, sendo parte do motor de crescimento que ocorre por meio da compra ou uso repetitivo?', 'Uma startup deve ser criada com o propósito de criar soluções para um problema/mercado que ainda não foi explorado?'];

    let perguntasNao = ['Quanto mais rápido e mais completo o lançamento de um produto, melhor, certo?', 'Pivotar é algo aceitável e desejável pelas startups, já que elas são instáveis, certo?',
                         'Se o produto sofre diversas mudanças, precisamos mudar nossa visão para adequá-la ao produto?', 'Uma mudança de longo prazo não precisa de feedback, já que é algo importante e útil que não pode ser desperdiçado, certo?',
                         'Se suas suposições não estão dando certo, precisamos continuar com o mesmo produto, forçando o cliente ou a estratégia a mudar?', 'Quando acabamos o protótipo de produto, podemos voltar a criar ideias e modificá-lo?',
                         'A contabilidade muitas vezes ajuda o investidor a pivotar ou persistir. Logo, podemos substituir o cliente pela contabilidade, já que eles têm a mesma função?', 'Todas as startups sempre precisam entregar um número aceitável de produtos com uma frequência mensal?',
                         'O motor de crescimento por meio de Publicidade Financiada tem como objetivo atingir os clientes já existentes da empresa?', 'Uma startup sempre deve se arriscar no mercado para crescer, então se basear em incertezas do mercado é uma boa escolha para uma tomada de decisão?',
                         'Muitas vezes os funcionários da startup acabam usando o produto, então seria melhor a empresa fazer pesquisas de clientes apenas com os colaboradores para gerar menos gastos?',
                         'Se uma versão beta do produto for lançada e não for muito bem aceita, o que deve ser feito é esperar o amadurecimento do mercado para os clientes começarem a utilizá-lo?', 'MVP (Produto Mínimo Viável) é a sigla que representa a versão final de um produto barato?',
                         'O objetivo de uma startup é entrar em um mercado já existente e concorrer com as maiores marcas do segmento?', 'O estilo de crescimento boca a boca se baseia em empresas fazendo parcerias com outras marcas para divulgar seu produto?',
                         'O motor de crescimento que é formado como efeito colateral da utilização do produto ocorre quando a empresa paga um influenciador digital para anunciar o produto nas redes sociais?'];

    MostraDica();
    MostraPergunta();
    VerificaNegacao();
    GerarAleatorio();
    VerificaPontos();
    Adiciona();
    $('#painelNome').hide()
    $('#pontosInsuficientes').hide();
    $('#alertaDinheiro').hide();
    $('#custoPivote').hide();
    $('#compras').hide();
    $('#upgrades').hide();
    $('#painelPergunta').hide();
    $('#perdendoDinheiro').hide();
    
   $('#imagem').on('click', function(){
        let valorTemp = parseInt($('#rendaValor').html());
        Incrementar();
        IncrementarClientes();
        clicks += 1;
        let valorTemp2 = parseInt($('#rendaValor').html()) - valorTemp;
        $('#textoAcrescimo').html('+' + valorTemp2);
        TocaSom('click');
    });

    $('#botao1').on('click', function(){
        $('#upgrades').hide();
        $('#compras').fadeIn();
    });

    $('#botao2').on('click', function(){
        $('#compras').hide();
        $('#upgrades').fadeIn();
    });

    $('#compra1').on('click', function(){
        Ganho('#compra1', 1000, 1, 1);
    });

    $('#compra2').on('click', function(){
        Ganho('#compra2', 1800, 3);
    });

    $('#compra3').on('click', function(){
        GanhoEdificio('../imagens/base1.png', '#compra3', 3000, 5, 5);
    });

    $('#compra4').on('click', function(){
        Ganho('#compra4', 4200, 3, 3);
    });

    $('#compra5').on('click', function(){
        Ganho('#compra5', 6400, 6);
    });

    $('#compra6').on('click', function(){
        GanhoEdificio('../imagens/base2.png', '#compra6', 10000, 7, 7);
    });

    $('#compra7').on('click', function(){
        Ganho('#compra7', 15000, 5, 5);
    });

    $('#compra8').on('click', function(){
        Ganho('#compra8', 20000, 10);
    });

    $('#compra9').on('click', function(){
        GanhoEdificio('../imagens/base3.png', '#compra9', 30000, 10, 10);
    });

    $('#upgrade1').on('click', function(){
        let temp = VerificaRenda(100);
        if (temp){
            $('#upgrade1').hide();
            valorAdiciona = 2;
            $('#rendaValor').html(parseInt($('#rendaValor').html())-100);
            TocaSom('compra');
            $('#upgrade1').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#upgrade2').on('click', function(){
        let temp = VerificaRenda(500);
        if (temp){
            aprovacao = GeraNumeros(80, 10);
            negacao = 100 - aprovacao;
            $('#valorAprovacoes').html(aprovacao);
            $('#valorNegacoes').html(negacao);
            $('#rendaValor').html(parseInt($('#rendaValor').html())-500);
            TocaSom('compra');
            $('#upgrade2').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#upgrade3').on('click', function(){
        let temp = VerificaRenda(2000);
        if (temp){
            aprovacao = GeraNumeros(80, 50);
            negacao = 100 - aprovacao;
            $('#valorAprovacoes').html(aprovacao);
            $('#valorNegacoes').html(negacao);
            $('#rendaValor').html(parseInt($('#rendaValor').html())-2000);
            TocaSom('compra');
            $('#upgrade3').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#upgrade4').on('click', function(){
        let temp = VerificaRenda(5000);
        if (temp){
            valorAdiciona = 3;
            TocaSom('compra');
            $('#rendaValor').html(parseInt($('#rendaValor').html())-5000);
            $('#upgrade4').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#upgrade5').on('click', function(){
        let temp = VerificaRenda(5800);
        if (temp){
            aprovacao = GeraNumeros(80, 20);
            negacao = 100 - aprovacao;
            $('#valorAprovacoes').html(aprovacao);
            $('#valorNegacoes').html(negacao);
            $('#rendaValor').html(parseInt($('#rendaValor').html())-5800);
            TocaSom('compra');
            $('#upgrade5').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#upgrade6').on('click', function(){
        let temp = VerificaRenda(8800);
        if (temp){
            aprovacao = GeraNumeros(80, 60);
            negacao = 100 - aprovacao;
            $('#valorAprovacoes').html(aprovacao);
            $('#valorNegacoes').html(negacao);
            $('#rendaValor').html(parseInt($('#rendaValor').html())-8800);
            TocaSom('compra');
            $('#upgrade6').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#upgrade7').on('click', function(){
        let temp = VerificaRenda(14800);
        if (temp){
            valorAdiciona = 4;
            TocaSom('compra');
            $('#rendaValor').html(parseInt($('#rendaValor').html())-14800);
            $('#upgrade7').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#upgrade8').on('click', function(){
        let temp = VerificaRenda(16400);
        if (temp){
            aprovacao = GeraNumeros(80, 40);
            negacao = 100 - aprovacao;
            $('#valorAprovacoes').html(aprovacao);
            $('#valorNegacoes').html(negacao);
            $('#rendaValor').html(parseInt($('#rendaValor').html())-16400);
            TocaSom('compra');
            $('#upgrade8').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#upgrade9').on('click', function(){
        let temp = VerificaRenda(28400);
        if (temp){
            aprovacao = GeraNumeros(80, 70);
            negacao = 100 - aprovacao;
            $('#valorAprovacoes').html(aprovacao);
            $('#valorNegacoes').html(negacao);
            $('#rendaValor').html(parseInt($('#rendaValor').html())-28400);
            TocaSom('compra');
            $('#upgrade9').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#upgrade10').on('click', function(){
        let temp = VerificaRenda(31600);
        if (temp){
            valorAdiciona = 5;
            TocaSom('compra');
            $('#rendaValor').html(parseInt($('#rendaValor').html())-31600);
            $('#upgrade10').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#upgrade11').on('click', function(){
        let temp = VerificaRenda(55600);
        if (temp){
            aprovacao = GeraNumeros(80, 50);
            negacao = 100 - aprovacao;
            $('#valorAprovacoes').html(aprovacao);
            $('#valorNegacoes').html(negacao);
            $('#rendaValor').html(parseInt($('#rendaValor').html())-55600);
            TocaSom('compra');
            $('#upgrade11').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#upgrade12').on('click', function(){
        let temp = VerificaRenda(79600);
        if (temp){
            aprovacao = GeraNumeros(90, 80);
            negacao = 100 - aprovacao;
            $('#valorAprovacoes').html(aprovacao);
            $('#valorNegacoes').html(negacao);
            $('#rendaValor').html(parseInt($('#rendaValor').html())-79600);
            TocaSom('compra');
            $('#upgrade12').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#upgrade13').on('click', function(){
        let temp = VerificaRenda(100000);
        if (temp){
            aprovacao = 100;
            negacao = 0;
            $('#valorAprovacoes').html(aprovacao);
            $('#valorNegacoes').html(negacao);
            $('#rendaValor').html(parseInt($('#rendaValor').html())-100000);
            TocaSom('compra');
            $('#upgrade13').hide();
        } else {
            DinheiroInsuficiente();
        };
    });

    $('#checkpoint').on('click', function(){
        if ($('#checkpointTexto').text() == 'Pivotar (marcado)'){
            if (parseInt($('#rendaValor').text()) < parseInt($('#custoPivote').text())){
                DinheiroInsuficiente();
            } else {
                $('#valorMarketing').text(info[0]);
                $('#valorVendas').text(info[1]);
                $('#valorInovacao').text(info[2]);
                $('#valorUX').text(info[3]);
                $('#xp').text(info[4]);
                $('#valorClientes').text(info[5]);
                $('#valorAprovacoes').text(info[6]);
                $('#valorNegacoes').text(info[7]);
                $('#checkpoint').css('background-color', 'rgb(83, 243, 118)');
                $('#checkpoint').css('text-align', 'center');
                $('#checkpointTexto').css('margin-left', '0px');
                $('#checkpointTexto').text('Pivotar (não marcado)');
                $('#custoPivote').hide();
                $('#rendaValor').text(parseInt($('#rendaValor').html())-parseInt($('#custoPivote').html()));
                TocaSom('alternativa');
            }
        } else {
            info = MarcaCheckpoint();
            $('#checkpoint').css('background-color', 'rgb(43, 199, 76)');
            $('#checkpoint').css('text-align', 'left');
            $('#checkpointTexto').css('margin-left', '15px');
            $('#checkpointTexto').text('Pivotar (marcado)');
            $('#custoPivote').show();
            TocaSom('alternativa');
            CalculaPivote();
        }
    });

    $('#nome').on('click', function(){
        MudarNome();
    });

    $('#adicionarMarketing').on('click', function(){
        if (parseInt($('#xp').html()) == 0){
            PontosInsuficientes();
        } else {
            $('#valorMarketing').html(parseInt($('#valorMarketing').html())+1);
            $('#xp').html(parseInt($('#xp').html())-1);
            TocaSom('alternativa');
            incrementoClientes += 5;
        };
    });

    $('#adicionarVendas').on('click', function(){
        if (parseInt($('#xp').html()) == 0){
            PontosInsuficientes();
        } else {
            $('#valorVendas').html(parseInt($('#valorVendas').html())+1);
            $('#xp').html(parseInt($('#xp').html())-1);
            TocaSom('alternativa');
            incremento += 2;
        };
    });

    $('#adicionarInovacao').on('click', function(){
        if (parseInt($('#xp').html()) == 0){
            PontosInsuficientes();
        } else {
            $('#valorInovacao').html(parseInt($('#valorInovacao').html())+1);
            $('#xp').html(parseInt($('#xp').html())-1);
            $('#valorNegacoes').html(parseInt($('#valorNegacoes').html())-5);
            TocaSom('alternativa');
        };
    });

    $('#adicionarUX').on('click', function(){
        if (parseInt($('#xp').html()) == 0){
            PontosInsuficientes();
        } else {
            $('#valorUX').html(parseInt($('#valorUX').html())+1);
            $('#xp').html(parseInt($('#xp').html())-1);
            $('#valorNegacoes').html(parseInt($('#valorNegacoes').html())-10);
            TocaSom('alternativa');
        };
    });

    $('#sim').on('click', function(){
        let pontos = $('#painelPergunta').data('pontos');
        if ($('#painelPergunta').data('correto') == 'correto'){
            $('#rendaValor').html(parseInt($('#rendaValor').html())+pontos);
            TocaSom('certo');
        } else {
            $('#rendaValor').html(parseInt($('#rendaValor').html())-pontos);
            TocaSom('errado');
        }
        $('#painelPergunta').fadeOut();
        perguntaAberta = false;
    });

    $('#nao').on('click', function(){
        let pontos = $('#painelPergunta').data('pontos');
        if ($('#painelPergunta').data('correto') == 'errado'){
            $('#rendaValor').html(parseInt($('#rendaValor').html())+pontos);
            TocaSom('certo');
        } else {
            $('#rendaValor').html(parseInt($('#rendaValor').html())-pontos);
            TocaSom('errado');
        }
        $('#painelPergunta').fadeOut();
        perguntaAberta = false;
    });
    
    function Incrementar(){
        $('#rendaValor').html(parseInt($('#rendaValor').html())+incremento);
    };

    function IncrementarClientes(){
        if (clicks%20 == 0){
            $('#valorClientes').html(parseInt($('#valorClientes').html())+clientes);
            TocaSom("fortune");
        };
    };

    function GerarAleatorio(){
        setTimeout(() => {
            valorAprovacao = GeraNumeros(99, 10);
            valorNegacao = 100 - valorAprovacao;
            $('#valorAprovacoes').html(valorAprovacao);
            $('#valorNegacoes').html(valorNegacao);
            GerarAleatorio();
        }, 30000);
    }

    function TocaSom(audio){
        let obj = document.createElement("audio");
        obj.src = "mp3/"+audio+".mp3";
        obj.play();
    };

    function choice(lista) {
        let index = Math.floor(Math.random() * lista.length);
        return lista[index];
    };

    function MostraDica(){
        let dicas = ['O movimento Startup enxuta visa previnir fracassos!', 'A startup enxuta é um conjunto de práticas destinadas a ajudar empreendedores a aumentar suas chances de construir uma startup bem-sucedida. ', 
                     'Sempre considere as ações dos consumidores à sua opinião.', 'Uma startup é uma instituição humana projetada para criar um novo produto ou serviço sob condições de incerteza extrema. ',
                     'As startups bem-sucedidas estão cheias de atividades associadas ao desenvolvimento de uma instituição: contratar funcionários criativos, coordenar suas atividades e criar uma cultura organizacional capaz de gerar resultados.',
                     'Muitas vezes perdemos de vista o fato de que uma startup não se resume a um produto, uma novidade tecnológica ou mesmo uma ideia brilhante. Uma startup é algo maior que a soma de suas partes: é um empreendimento intensamente humano.',
                     'Cultivar empreendedorismo é responsabilidade de alta administração.', 'A inovação é algo que acontece de baixo para cima, descentralizada e imprevisível, mas isso não significa que não possa ser administrada.',
                     'Sempre mantenha olhos e ouvido atentos aos seus clientes para saber qual a necessidade deles e como você irá suprir isso.', 'Para o método startup enxuta, os esforços das startups são experimentos que servem como teste de estratégia, permitindo verificar quais pontos são de fato brilhantes e quais absurdos.',
                     'Um experimento é mais do que uma investigação teórica, é também o seu primeiro produto. Se for bem-sucedido, permite que o gestor inicie sua campanha, recrutando adotantes, iniciais, acrescentando funcionários para cada experimento ou interação posterior e, por fim, começando a desenvolver um produto.',
                     'Pense grande comece pequeno.', 'Uma startup é um catalisador que transforma ideias em produtos.', 
                     'Os marcos de aprendizagem são uteis para os empreendedores avaliarem seu progresso de modo preciso e objetivo, além de serem valiosíssimos para os gestores e investidores.',
                     'O método startup enxuta cria empresas com eficiência de capital porque mostra mais cedo se é hora de pivotar, gerando assim menos desperdício de tempo e dinheiro.',
                     'Todo plano de negócios começa com um conjunto de suposições.', 'A estratégia dos negócios tradicionais é excelente em ajudar a identificar quais são as suposições daquele negócio.',
                     'O objetivo do contato inicial com os consumidores não é obter respostas definitivas, é esclarecer num nível básico, rudimentar, que entendemos nosso cliente potencial e seus problemas.',
                     'Um produto mínimo varável (MVP) contribui para que o processo de aprendizagem seja iniciado o mais rápido possível. Mas não é necessariamente o menor produto imaginável, apenas o trajeto mais rápido no clico construir-medir-aprender com o mínimo de esforço.',
                     'Um dos aspectos mais incômodos do MVP é o desafio que ele representa para as noções tradicionais de qualidade. Desde os melhores profissionais aos melhores artesões, todos aspiram a desenvolver produtos de qualidade.',
                     'Os fluxos de clientes governam a interação destes com os produtos de uma empresa; permitem entender um negócio quantitativamente e têm muito mais capacidade de previsão do que as métricas brutas tradicionais.',
                     'O modelo startup não se opõe a desenvolver produtos de alta qualidade, desde que atendem ao objetivo de obter clientes.',
                     'Uma das principais maneiras de impulsionar o crescimento sustentável é o Boca a boca. Um nível natural de crescimento está integrado na maioria dos produtos provocado pelo entusiasmo dos clientes satisfeitos com o produto.',
                     'Uma maneira de impulsionar o crescimento sustentável é como o efeito colateral da utilização do produto. Quando você vê alguém vestido com uma roupa de grife ou dirigindo um certo carro, você pode ser influenciado a comprar aquele produto.',
                     'Por meio de publicidade financiada, é uma das quatro maneiras de impulsionar o crescimento sustentável. Se trata de quando a maioria das empresas utiliza a publicidade para incitar novos clientes a usar seus produtos. Para isso ser uma fonte de crescimento sustentável, a publicidade deve ser paga como resultado da receita recorrente, não de fontes ocasionais.',
                     'Por meio da compra ou do uso repetido. Alguns produtos são projetados para ser comprados repetidas vezes por meio de um plano de assinatura ou de recompras voluntárias. Isso se trata de uma das maneiras de impulsionar o crescimento sustentável.',
                     'A Startup enxuta deve evitar doutrinas e ideologias rígidas.', 'Tal como Taylor, o nosso é convencer os gestores das corporações modernas a colocar o sistema em primeiro plano.',
                     'O desafio é criar mecanismos para empoderar abertamente as equipes de inovação. Esse é o caminho para manter uma cultura sustentável de inovação ao longo do tempo, mesmo enquanto a empresa enfrenta repartidas ameaças existenciais.',
                     'As equipes de startups precisam de autonomia absoluta para desenvolver e comercializar produtos novos dentro do seu escopo limitado; precisam poder conceber e executar experimentos sem precisar de um número excessivo de aprovações.',
                     'À medida que as startups crescem, os empreendedores podem desenvolver organizações que aprendam a equilibrar as necessidades dos clientes existentes com os desafios de encontrar novos a quem atender.',
                     'Startups enxutas precisam de um processo que proporcione um ciclo de feedback natural.'];
        let dica = choice(dicas);
        setTimeout(() => {
            $('#campoDica').text(dica);
            MostraDica();
        }, 20000);
    };

    function VerificaPontos(){
        setTimeout(() => {
            if (parseInt($('#valorRenda'))%1000 == 0){
                $('#xp').html(parseInt($('#xp').html())+1);
                TocaSom('ponto');
            };
            VerificaPontos();
        }, 1);
    };

    function MarcaCheckpoint(){
        let conjunto = [$('#valorMarketing').html(), $('#valorVendas').html(),
                        $('#valorInovacao').html(), $('#valorUX').html(),
                        $('#xp').html(), $('#valorClientes').html(), $('#valorAprovacoes').html(),
                        $('#valorNegacoes').html()];
        return conjunto;
    };

    function Adiciona(){
        setTimeout(() => {
            $('#rendaValor').html(parseInt($('#rendaValor').html())+valorAdiciona);
            Adiciona();      
        }, 5000);
    };

    function CalculaPivote(){
        valorAlterado = parseInt($('#custoPivote').html()) + 20;
        setTimeout(() => {
            $('#custoPivote').text(valorAlterado);
            CalculaPivote();
        }, 10000);
    };

    function Ganho(local, renda, incrementoRenda = 0, incrementoClientes = 0){
        let verificacao = VerificaRenda(renda);
        if (verificacao){
            $('#rendaValor').html(parseInt($('#rendaValor').html())-renda);
            incremento += incrementoRenda;
            clientes += incrementoClientes;
            TocaSom('compra');
            $(local).hide();
        } else {
            DinheiroInsuficiente();
        };
    };

    function GanhoEdificio(imagem, local, renda, incrementoRenda = 0, incrementoClientes = 0){
        let verificacao = VerificaRenda(renda);
        if (verificacao){
            AlterarImagem(imagem)
            $('#rendaValor').html(parseInt($('#rendaValor').html())-renda);
            incremento += incrementoRenda;
            clientes += incrementoClientes;
            TocaSom('compra');
            $(local).hide();
        } else {
            DinheiroInsuficiente();
        };
    };

    function PontosInsuficientes(){
        $('#pontosInsuficientes').show();
        TocaSom('pop1');

        $('.botaoFechar').on('click', function(){
            $('#pontosInsuficientes').fadeOut();
        });
    };    

    function DinheiroInsuficiente(){
        $('#alertaDinheiro').show();
        TocaSom('pop1');

        $('.botaoFechar').on('click', function(){
            $('#alertaDinheiro').fadeOut();
        });
    };

    function VerificaNegacao(){
        setTimeout(() => {
            let num;
            if (parseInt($('#valorNegacoes').html()) >= 50){
                num = GeraNumeros(500, 200);
                $('#rendaValor').html(parseInt($('#rendaValor').html())-num);
                $('#perdendoDinheiro').show();
                TocaSom('alerta')
                $('.botaoFechar').on('click', function(){
                    $('#perdendoDinheiro').fadeOut();
                });
            };
            VerificaNegacao();
        }, 20000);
    };

    function MudarNome(){
        $('#painelNome').show();
        TocaSom('pop1');

        $('#continuar').on('click', function(){
            if ($('#inputNome').val() == ''){
                $('#nome').text('Nome indefinido');
                $('#painelNome').fadeOut();
            } else {
                $('#nome').text($('#inputNome').val());
                $('#painelNome').fadeOut();
            };
        });

        $('#cancelar').on('click', function(){
            $('#painelNome').fadeOut();
        });
    };

    function AlterarImagem(novaImagem){
        $('#imagem').attr('src', novaImagem);
    };

    function VerificaRenda(preco){
        if (parseInt($('#rendaValor').html()) >= preco){
            return true;
        } else {
            return false;
        }
    };

    function GeraNumeros(valor, referencia = 50){
        let x;
        do {
            x = Math.floor(Math.random() * valor + referencia);
            console.log(x);
        } while (x>valor);
        return x;
    };

    function MostraPergunta(){
        setTimeout(() => {
            if (perguntaAberta == false){
                let numero = GeraNumeros(500);
                $('#painelPergunta').data('pontos', numero);
                let simOuNao = [1, 2];
                let escolha = choice(simOuNao);
                $('#painelPergunta').show();
                perguntaAberta = true;

                if (escolha == 1){
                    GeraPergunta(perguntasSim);
                    $('#painelPergunta').data('correto', 'correto');
                } else {
                    GeraPergunta(perguntasNao);
                    $('#painelPergunta').data('correto', 'errado');
                };
            }
            MostraPergunta();
        }, 30000);
    };

    function GeraPergunta(pergunta){
        $('#pergunta').html(choice(pergunta));
    };
});