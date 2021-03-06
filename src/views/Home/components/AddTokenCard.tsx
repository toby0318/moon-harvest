import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Card, Heading, Text } from '@pancakeswap-libs/uikit'
import { useCake } from '../../../hooks/useContract'
import { getWeb3 } from '../../../utils/web3'

const MainContainer = styled(Card)`
  padding: 24px;
  ${({ theme }) => theme.mediaQueries.lg} {    
    grid-column: span 12 !important;
    max-width: 100% !important;
  }
`

const TooltipButton = styled(Button)`
  overflow: visible;
  position: relative;
  & > .tooltip{
    display: none;
    position: absolute;
    top: 110%;
    left: 40%;
    width: 20%;
    text-align: center;
    background: rgba(0,0,0,0.5);
    border-radius: 10px;
    padding: 10px 8px;
  }
  &:hover > .tooltip{
    display: block;
  }
`

const ItemDiv = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  line-height: 1.1em;
`
const ChildDiv = styled.div`
  width: 50%;
  text-align: center;
  &>button>img{
    width: 32px;
    margin-left: 10px;
  }
`
const AddTokenCard = () => {
  const cakeContract = useCake()

  const [tokenAddress, setTokenAddress] = useState("0x8d9087a2B7E446bb69343542e1430E974f12a18F")
  const [copyTooltip, setCopyTooltip] = useState("Copy Address")
  const [isPending, setIsPending] = useState(false)

  const handleCopy = ()=>{
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tokenAddress);
      setCopyTooltip("Copied");
    }
  }

  const addToken = async ()=>{
    setIsPending(true)
    const tokenSymbol = await cakeContract.methods.symbol().call();
    const tokenDecimals = await cakeContract.methods.decimals().call();
    const web3 = getWeb3()
    await web3.givenProvider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: '',
        },
      },
    });
    setIsPending(false)
  }

  const buyToken = ()=>{
    window.open("https://exchange.pancakeswap.finance/#/swap?outputCurrency=".concat(tokenAddress))
  }

  return (
    <MainContainer>
      <Heading color="primary" size="xl" style={{ width:"100%",textAlign: "center" }}>Add Helium 3</Heading>
      <div style={{width: "80%",margin: "0 auto", marginTop: "3em"}}>
        <ItemDiv>
          <div style={{width: "80px"}}>
            <img src="/images/he3.png" alt="He3" width="64px"/>
          </div>
          <div>
            <div>
              <Text color="textSubtle">
                Token Address
              </Text>
              <TooltipButton onClick={handleCopy}>
                {tokenAddress}
                <span className="tooltip">{copyTooltip}</span>
              </TooltipButton>
            </div>
          </div>
        </ItemDiv>
        <ItemDiv style={{marginTop: "1em"}}>
          <ChildDiv>
            <Button onClick={addToken} disabled={isPending}>Add He3 to <img src="/images/icons/metamask.png" alt="metamask"/></Button>
          </ChildDiv>
          <ChildDiv>
            <Button onClick={buyToken}>Buy He3 to <img src="/images/icons/pancake.png" alt="pancake"/></Button>
          </ChildDiv>
        </ItemDiv>
      </div>
    </MainContainer>
  )
}
export default AddTokenCard